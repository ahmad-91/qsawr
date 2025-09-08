import { useState, useEffect, useMemo, useCallback } from 'react';

interface VirtualScrollingConfig {
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
  totalItems: number;
}

interface VirtualScrollingResult {
  startIndex: number;
  endIndex: number;
  visibleItems: number;
  offsetY: number;
  totalHeight: number;
  scrollElementProps: {
    style: React.CSSProperties;
    onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  };
  innerElementProps: {
    style: React.CSSProperties;
  };
}

export const useVirtualScrolling = ({
  itemHeight,
  containerHeight,
  overscan = 5,
  totalItems,
}: VirtualScrollingConfig): VirtualScrollingResult => {
  const [scrollTop, setScrollTop] = useState(0);

  // Calculate visible range
  const visibleRange = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight),
      totalItems - 1
    );

    return {
      startIndex: Math.max(0, startIndex - overscan),
      endIndex: Math.min(totalItems - 1, endIndex + overscan),
    };
  }, [scrollTop, itemHeight, containerHeight, totalItems, overscan]);

  // Calculate offsets and heights
  const totalHeight = totalItems * itemHeight;
  const offsetY = visibleRange.startIndex * itemHeight;
  const visibleItems = visibleRange.endIndex - visibleRange.startIndex + 1;

  // Handle scroll
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  // Reset scroll when totalItems changes
  useEffect(() => {
    setScrollTop(0);
  }, [totalItems]);

  // Scroll element props
  const scrollElementProps = useMemo(() => ({
    style: {
      height: containerHeight,
      overflow: 'auto' as const,
    },
    onScroll: handleScroll,
  }), [containerHeight, handleScroll]);

  // Inner element props
  const innerElementProps = useMemo(() => ({
    style: {
      height: totalHeight,
      position: 'relative' as const,
    },
  }), [totalHeight]);

  return {
    startIndex: visibleRange.startIndex,
    endIndex: visibleRange.endIndex,
    visibleItems,
    offsetY,
    totalHeight,
    scrollElementProps,
    innerElementProps,
  };
};

// Hook for dynamic item heights (more complex scenarios)
interface DynamicVirtualScrollingConfig {
  getItemHeight: (index: number) => number;
  containerHeight: number;
  overscan?: number;
  totalItems: number;
}

export const useDynamicVirtualScrolling = ({
  getItemHeight,
  containerHeight,
  overscan = 5,
  totalItems,
}: DynamicVirtualScrollingConfig) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  // Calculate item positions
  const itemPositions = useMemo(() => {
    const positions: number[] = [];
    let runningOffset = 0;
    
    for (let i = 0; i < totalItems; i++) {
      positions[i] = runningOffset;
      runningOffset += getItemHeight(i);
    }
    
    return positions;
  }, [totalItems, getItemHeight]);

  // Find visible range using binary search
  const visibleRange = useMemo(() => {
    if (itemPositions.length === 0) {
      return { startIndex: 0, endIndex: 0 };
    }

    // Binary search for start index
    let startIndex = 0;
    let endIndex = itemPositions.length - 1;
    
    while (startIndex < endIndex) {
      const mid = Math.floor((startIndex + endIndex) / 2);
      if (itemPositions[mid] < scrollTop) {
        startIndex = mid + 1;
      } else {
        endIndex = mid;
      }
    }

    // Find end index
    let visibleEndIndex = startIndex;
    let accumulatedHeight = 0;
    
    while (
      visibleEndIndex < totalItems &&
      accumulatedHeight < containerHeight
    ) {
      accumulatedHeight += getItemHeight(visibleEndIndex);
      visibleEndIndex++;
    }

    return {
      startIndex: Math.max(0, startIndex - overscan),
      endIndex: Math.min(totalItems - 1, visibleEndIndex + overscan),
    };
  }, [scrollTop, containerHeight, itemPositions, totalItems, overscan, getItemHeight]);

  const totalHeight = useMemo(() => {
    if (itemPositions.length === 0) return 0;
    const lastIndex = totalItems - 1;
    return itemPositions[lastIndex] + getItemHeight(lastIndex);
  }, [itemPositions, totalItems, getItemHeight]);

  const offsetY = itemPositions[visibleRange.startIndex] || 0;
  const visibleItems = visibleRange.endIndex - visibleRange.startIndex + 1;

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  useEffect(() => {
    setScrollTop(0);
  }, [totalItems]);

  return {
    startIndex: visibleRange.startIndex,
    endIndex: visibleRange.endIndex,
    visibleItems,
    offsetY,
    totalHeight,
    scrollElementProps: {
      style: {
        height: containerHeight,
        overflow: 'auto' as const,
      },
      onScroll: handleScroll,
    },
    innerElementProps: {
      style: {
        height: totalHeight,
        position: 'relative' as const,
      },
    },
  };
};
