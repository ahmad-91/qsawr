# Qsawr Frontend - نظام قساور للمقاولات

A modern React.js frontend application with Frappe backend integration, designed specifically for Arabic RTL (Right-to-Left) support.

## Features

- 🔐 **Secure Authentication**: Integration with Frappe backend using cookie-based sessions
- 🌍 **Arabic RTL Support**: Full Right-to-Left language support
- 🎨 **Modern UI/UX**: Beautiful and responsive design
- 📱 **Responsive Design**: Works on all devices
- 🚀 **Scalable Architecture**: Easy to extend with new features
- 🔒 **Session Management**: Secure user sessions with automatic cookie handling
- 🎯 **Dashboard**: Modern dashboard with statistics and features
- 🔔 **Toast Notifications**: Comprehensive notification system with Arabic support

## Tech Stack

- **React 18** with TypeScript
- **React Router** for navigation
- **Styled Components** for styling
- **Axios** for API communication with cookie support
- **Frappe Framework** backend integration

## Prerequisites

- Node.js (v16 or higher)
- npm package manager
- Frappe backend running (configured in environment)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd qsawr-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file and set your Frappe backend URL:
   ```env
   REACT_APP_FRAPPE_URL=https://your-frappe-backend-url
   ```

4. **Start development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard/      # Dashboard component
│   ├── Login/          # Login component
│   ├── ProtectedRoute/ # Route protection
│   ├── Toast/          # Toast notification system
│   │   ├── Toast.tsx   # Individual toast component
│   │   ├── ToastContainer.tsx # Toast container
│   │   ├── ToastDemo.tsx # Demo component
│   │   └── index.ts    # Export file
│   └── styled/         # Styled components
├── contexts/           # React contexts
│   ├── AuthContext.tsx # Authentication context
│   └── ToastContext.tsx # Toast notification context
├── services/           # API services
│   ├── frappeApi.ts   # Frappe API integration
│   └── frappeApi.test.ts # API usage examples
├── shared/             # Shared utilities
│   └── themes/         # Theme configuration
├── App.tsx            # Main app component
└── index.tsx          # App entry point
```

## Toast Notification System

The application includes a comprehensive toast notification system with full Arabic RTL support.

### Features

- **Multiple Types**: Success, Error, Warning, Info
- **Arabic RTL Support**: Full Right-to-Left layout and Arabic text
- **Auto-dismiss**: Configurable duration with progress bar
- **Manual Close**: Click to close individual toasts
- **Responsive Design**: Works on all screen sizes
- **Theme Integration**: Uses application theme colors
- **Animation**: Smooth slide-in/out animations
- **Stacking**: Multiple toasts can be displayed simultaneously

### Usage

#### Basic Usage

```tsx
import { useToast } from '../contexts/ToastContext';

const MyComponent = () => {
  const { showSuccess, showError, showWarning, showInfo } = useToast();

  const handleSuccess = () => {
    showSuccess('تم بنجاح', 'تم حفظ البيانات بنجاح');
  };

  const handleError = () => {
    showError('حدث خطأ', 'فشل في حفظ البيانات');
  };

  const handleWarning = () => {
    showWarning('تحذير', 'يرجى التحقق من البيانات');
  };

  const handleInfo = () => {
    showInfo('معلومات', 'تم تحديث النظام');
  };

  return (
    <div>
      <button onClick={handleSuccess}>إظهار نجاح</button>
      <button onClick={handleError}>إظهار خطأ</button>
      <button onClick={handleWarning}>إظهار تحذير</button>
      <button onClick={handleInfo}>إظهار معلومات</button>
    </div>
  );
};
```

#### Advanced Usage

```tsx
import { useToast } from '../contexts/ToastContext';

const MyComponent = () => {
  const { showToast, clearAllToasts } = useToast();

  // Custom toast with specific duration
  const showCustomToast = () => {
    showToast('info', 'إشعار مخصص', 'رسالة مخصصة', 8000);
  };

  // Persistent toast (won't auto-dismiss)
  const showPersistentToast = () => {
    showToast('warning', 'إشعار دائم', 'هذا الإشعار لن يختفي', 0);
  };

  // Clear all toasts
  const clearAll = () => {
    clearAllToasts();
  };

  return (
    <div>
      <button onClick={showCustomToast}>إشعار مخصص</button>
      <button onClick={showPersistentToast}>إشعار دائم</button>
      <button onClick={clearAll}>مسح الكل</button>
    </div>
  );
};
```

#### Toast Types

| Type | Color | Icon | Use Case |
|------|-------|------|----------|
| `success` | Green | ✅ | Successful operations |
| `error` | Red | ❌ | Errors and failures |
| `warning` | Orange | ⚠️ | Warnings and cautions |
| `info` | Blue | ℹ️ | General information |

#### Configuration Options

```tsx
interface ToastItem {
  id: string;           // Auto-generated unique ID
  type: ToastType;      // Toast type (success, error, warning, info)
  title: string;        // Main title (Arabic supported)
  message?: string;     // Optional detailed message
  duration?: number;    // Auto-dismiss duration in milliseconds (0 = persistent)
}
```

### Integration

The toast system is automatically integrated into the application:

1. **ToastProvider**: Wraps the entire application
2. **ToastContainer**: Displays toasts in the top-left corner
3. **useToast Hook**: Available in all components
4. **Theme Integration**: Uses application color scheme
5. **RTL Support**: Full Arabic Right-to-Left layout

### Customization

#### Styling

Toasts automatically use the application theme:

```tsx
// Colors are automatically applied based on toast type
const ToastContainer = styled.div<{ type: ToastType }>`
  border-right: 4px solid ${({ theme, type }) => {
    switch (type) {
      case 'success': return theme.colors.success;
      case 'error': return theme.colors.error;
      case 'warning': return theme.colors.warning;
      case 'info': return theme.colors.info;
      default: return theme.colors.primary;
    }
  }};
`;
```

#### Positioning

Toasts are positioned in the top-left corner by default. To change position, modify `ToastContainer.tsx`:

```tsx
const Container = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.spacing.lg};
  left: ${({ theme }) => theme.spacing.lg}; // Change to 'right' for LTR
  z-index: 9999;
`;
```

## Configuration

### Frappe Backend Integration

The application integrates with Frappe backend using the official cookie-based authentication method:

#### Authentication Endpoints

- **Login**: `POST /api/method/login`
  ```json
  {
    "usr": "username or email",
    "pwd": "password"
  }
  ```

- **Logout**: `POST /api/method/logout`

- **Session Check**: `GET /api/method/frappe.auth.get_logged_user`

- **User Info**: `GET /api/resource/User/{username}`

#### Cookie-Based Authentication

The application uses Frappe's recommended cookie-based authentication:

1. **Login Request**: Sends credentials to `/api/method/login`
2. **Session Cookies**: Frappe sets session cookies in response
3. **Automatic Cookie Handling**: Axios automatically includes cookies in subsequent requests
4. **Session Validation**: Each request validates session via cookies
5. **Logout**: Clears session cookies and local storage

#### Key Configuration

```typescript
// Axios configuration with cookie support
const api = axios.create({
  baseURL: process.env.REACT_APP_FRAPPE_URL,
  withCredentials: true, // Enables cookie transmission
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});
```

### Authentication Flow

1. User enters credentials on login page
2. Credentials sent to Frappe backend via POST `/api/method/login`
3. On successful login, Frappe sets session cookies
4. User redirected to dashboard
5. Cookies automatically included in all subsequent requests
6. Session expires or user logs out

### RTL Support

The application is fully configured for Arabic RTL support:

- CSS `direction: rtl` throughout
- Arabic font (Cairo) integration
- RTL-aware layouts and components
- Arabic text and labels

## Customization

### Themes

Edit `src/shared/themes/index.ts` to customize:

- Colors
- Typography
- Spacing
- Shadows
- Border radius

### Styling

All components use styled-components with theme integration:

```tsx
import styled from 'styled-components';
import { theme } from '../shared/themes';

const StyledComponent = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md};
`;
```

## Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `build` folder** to your web server

3. **Configure environment variables** for production

4. **Ensure CORS is configured** on your Frappe backend with credentials support

### CORS Configuration for Frappe

Your Frappe backend must allow credentials for cross-origin requests:

```python
# In your Frappe app's hooks.py or similar
app_include_js = [
    # ... other includes
]

# Ensure CORS allows credentials
app_include_css = [
    # ... other includes
]

# CORS configuration
app_include_js = [
    # ... other includes
]
```

## Security Features

- **Cookie-Based Sessions**: Uses Frappe's secure session management
- **Protected Routes**: Route protection for authenticated users
- **Automatic Session Validation**: Each request validates session
- **Secure Logout**: Proper session cleanup on logout
- **No Token Storage**: No sensitive tokens stored in localStorage
- **CSRF Protection**: Inherits Frappe's CSRF protection

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Note**: Cookie-based authentication requires proper CORS configuration and HTTPS in production.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team.

---

**Note**: This application requires a running Frappe backend instance with proper CORS configuration for full functionality.
