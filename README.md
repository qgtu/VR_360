# 🌍 Panorama Tourism 360°

> **Nền tảng du lịch thực tế ảo 360° - Khám phá di sản văn hóa Việt Nam qua công nghệ Web VR**

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![A-Frame](https://img.shields.io/badge/A--Frame-1.7.1-orange.svg)](https://aframe.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 📖 Mục lục

- [Giới thiệu](#-giới-thiệu)
- [Demo & Screenshots](#-demo--screenshots)
- [Tính năng nổi bật](#-tính-năng-nổi-bật)
- [Công nghệ sử dụng](#️-công-nghệ-sử-dụng)
- [Kiến trúc hệ thống](#-kiến-trúc-hệ-thống)
- [Cài đặt & Triển khai](#-cài-đặt--triển-khai)
- [API Documentation](#-api-documentation)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Đóng góp](#-đóng-góp)
- [License](#-license)

---

## 🎯 Giới thiệu

**Panorama Tourism 360°** là nền tảng du lịch thực tế ảo tiên tiến, cho phép người dùng khám phá các di sản văn hóa, danh lắm du lịch Việt Nam qua trải nghiệm 360° immersive. Dự án được xây dựng với mục tiêu:

- 🏛️ **Bảo tồn di sản văn hóa** qua công nghệ số
- 🌐 **Dân chủ hóa du lịch** - Mọi người đều có thể trải nghiệm không giới hạn địa lý
- 🚀 **Ứng dụng công nghệ hiện đại** - WebVR, Interactive Maps, Responsive Design
- 📱 **Cross-platform** - Hoạt động mượt mà trên Desktop, Mobile, VR Headsets

### ✨ Dành cho ai?

- **Du khách**: Khám phá điểm đến trước khi đi du lịch thực tế
- **Nhà giáo dục**: Công cụ giảng dạy sinh động về địa lý, lịch sử, văn hóa
- **Doanh nghiệp du lịch**: Quảng bá điểm đến, tạo trải nghiệm marketing độc đáo
- **Researcher**: Nghiên cứu, lưu trữ di sản văn hóa

---

## 🖼️ Demo & Screenshots

### 🌐 Live Demo
👉 **[Truy cập Demo](http://localhost:3000)** (Development mode)

### 📸 Screenshots

| Interactive Map | 360° Panorama Viewer |
|:---:|:---:|
| ![Map](docs/images/map-preview.png) | ![Panorama](docs/images/panorama-preview.png) |

| VR Tour Experience | Hotspot Interactions |
|:---:|:---:|
| ![VR Tour](docs/images/vr-tour.png) | ![Hotspots](docs/images/hotspots.png) |

---

## ✨ Tính năng nổi bật

### 🗺️ **Interactive Map Explorer**
- ✅ Bản đồ tương tác với **Mapbox GL JS**
- ✅ Hiển thị tours theo vị trí địa lý với custom markers
- ✅ Filter theo danh mục (Văn hóa, Lịch sử, Thiên nhiên...)
- ✅ Search tìm kiếm địa điểm nhanh chóng
- ✅ Popup preview panorama khi click vào marker
- ✅ Responsive sidebar với danh sách tours

### 🏛️ **360° Panorama Viewer**
- ✅ Trình chiếu panorama 360° với **A-Frame WebVR**
- ✅ UI/UX hiện đại, trực quan
- ✅ Thông tin chi tiết địa điểm với description đầy đủ
- ✅ Navigation mượt mà giữa các panorama
- ✅ Responsive design - hoạt động tốt trên mọi thiết bị
- ✅ Lazy loading cho hiệu suất tối ưu

### 🥽 **Immersive VR Tour**
- ✅ Trải nghiệm VR hoàn chỉnh với **A-Frame**
- ✅ **Hotspot tương tác** đa dạng:
  - 🔗 Navigation hotspots - Di chuyển giữa scenes
  - ℹ️ Info hotspots - Thông tin lịch sử, văn hóa
  - 🖼️ Image hotspots - Hiển thị ảnh chi tiết
  - 🎬 Video hotspots - Embedded videos
- ✅ **Auto-tour mode** - Tự động chuyển scene
- ✅ **Progress tracking** - Theo dõi tiến trình tour
- ✅ **Thumbnail navigation** - Điều hướng nhanh bằng thumbnails
- ✅ **VR headset support** - Tương thích Oculus, Vive, Google Cardboard
- ✅ **Performance optimized** - GPU memory management

### 🎨 **Modern User Experience**
- ✅ Clean, minimal interface design
- ✅ Bootstrap 5 responsive components
- ✅ React Router seamless navigation
- ✅ Toast notifications cho user feedback
- ✅ Loading states & error handling
- ✅ Accessibility (A11y) compliant

---

## 🛠️ Công nghệ sử dụng

### **Frontend Stack**

| Technology | Version | Purpose |
|:-----------|:--------|:--------|
| ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white) | 19.1.0 | UI Framework |
| ![A-Frame](https://img.shields.io/badge/-A--Frame-EF2D5E?logo=aframe&logoColor=white) | 1.7.1 | WebVR/360° Rendering |
| ![Mapbox](https://img.shields.io/badge/-Mapbox-000000?logo=mapbox&logoColor=white) | 3.13.0 | Interactive Maps |
| ![Bootstrap](https://img.shields.io/badge/-Bootstrap-7952B3?logo=bootstrap&logoColor=white) | 5.3.7 | UI Components |
| ![React Router](https://img.shields.io/badge/-React_Router-CA4245?logo=react-router&logoColor=white) | 7.6.3 | Routing |
| ![Axios](https://img.shields.io/badge/-Axios-5A29E4?logo=axios&logoColor=white) | 1.10.0 | HTTP Client |
| ![Three.js](https://img.shields.io/badge/-Three.js-000000?logo=three.js&logoColor=white) | 0.173.0 | 3D Graphics |

### **Backend Stack**

| Technology | Version | Purpose |
|:-----------|:--------|:--------|
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white) | - | Runtime |
| ![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white) | 4.21.2 | Web Framework |
| ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white) | 8.12.1 | Database |
| ![JWT](https://img.shields.io/badge/-JWT-000000?logo=json-web-tokens&logoColor=white) | 9.0.2 | Authentication |
| ![Cloudinary](https://img.shields.io/badge/-Cloudinary-3448C5?logo=cloudinary&logoColor=white) | 2.6.0 | Image Hosting |
| ![Multer](https://img.shields.io/badge/-Multer-FF6C37?logo=multer&logoColor=white) | 1.4.5 | File Upload |

### **DevOps & Tools**

- **Version Control**: Git, GitHub
- **Package Manager**: npm
- **Code Quality**: ESLint
- **Testing**: Jest, React Testing Library
- **Deployment**: (TBD - Docker, AWS, Vercel)

---

## 🏗️ Kiến trúc hệ thống

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │   Map    │  │Panorama  │  │ VR Tour  │  │   Home   │     │
│  │Component │  │  Viewer  │  │Component │  │Component │     │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘     │
│       └─────────────┴─────────────┴─────────────┘           │
│                         │                                   │
│              ┌──────────▼──────────┐                        │ 
│              │   React Router      │                        │
│              └──────────┬──────────┘                        │
└───────────────────────┬─┴───────────────────────────────────┘
                        │
              ┌─────────▼─────────┐
              │   API LAYER       │
              │  (axiosClient)    │
              └─────────┬─────────┘
                        │
┌───────────────────────▼──────────────────────────────────┐
│                   REST API SERVER                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Tours   │  │Panoramas │  │ Hotspots │  │  Users   │  │
│  │Controller│  │Controller│  │Controller│  │Controller│  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘  │
│       │             │             │             │        │
│  ┌────▼─────┐  ┌────▼─────┐  ┌────▼─────┐  ┌────▼─────┐  │
│  │  Tours   │  │Panoramas │  │ Hotspots │  │  Users   │  │
│  │ Service  │  │ Service  │  │ Service  │  │ Service  │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘  │
│       │             │             │             │        │
│  ┌────▼─────┐  ┌────▼─────┐  ┌────▼─────┐  ┌────▼─────┐  │
│  │   Tour   │  │ Panorama │  │ Hotspot  │  │   User   │  │
│  │  Model   │  │  Model   │  │  Model   │  │  Model   │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
└───────────────────────┬──────────────────────────────────┘
                        │
              ┌─────────▼─────────┐
              │   MongoDB Atlas   │
              └───────────────────┘

External Services:
├─ Cloudinary (Image CDN)
└─ Mapbox API (Maps)
```

### **Data Flow**

```
User Action → Component → Custom Hook → API Call → 
Backend Controller → Service → Repository → MongoDB →
Response → State Update → UI Re-render
```

---

## 🚀 Cài đặt & Triển khai

### **Prerequisites**

Đảm bảo bạn đã cài đặt:

```bash
Node.js >= 16.x
npm >= 8.x
MongoDB >= 6.x
Git
```

### **📥 Installation Guide**

#### **1. Clone Repository**

```bash
git clone https://github.com/qgtu/VR_360.git
cd panorama-tourism-360
```

#### **2. Setup Backend**

```bash
cd Backend
npm install
```

**Tạo file `.env` trong thư mục Backend:**

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/panorama_tourism
# Hoặc sử dụng MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/panorama_tourism

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRES_IN=7d

# Cloudinary Configuration (cho upload ảnh 360°)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS
CORS_ORIGIN=http://localhost:3000

# Upload Settings
MAX_FILE_SIZE=50mb
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/jpg
```

**Lấy Cloudinary Credentials:**
1. Đăng ký tại: https://cloudinary.com/users/register/free
2. Truy cập Dashboard → Account Settings
3. Copy `Cloud Name`, `API Key`, `API Secret`

**Khởi động Backend:**

```bash
# Seed admin user (optional)
node seedAdminUsers.js

# Start development server
npm start
# hoặc với nodemon:
npm run start:dev
```

Server chạy tại: `http://localhost:3001`

#### **3. Setup Frontend**

```bash
cd Frontend
npm install
```

**Tạo file `.env` trong thư mục Frontend:**

```env
# API Configuration
REACT_APP_API_URL=http://localhost:3001/api

# Mapbox Configuration
REACT_APP_MAPBOX_TOKEN=your_mapbox_token_here

# App Configuration
REACT_APP_NAME=Panorama Tourism 360°
REACT_APP_VERSION=1.0.0
```

**Lấy Mapbox Access Token:**
1. Đăng ký tại: https://account.mapbox.com/auth/signup/
2. Truy cập: https://account.mapbox.com/access-tokens/
3. Tạo token mới hoặc copy token mặc định
4. Paste vào file `.env`

**Khởi động Frontend:**

```bash
npm start
```

Ứng dụng chạy tại: `http://localhost:3000`

#### **4. Verify Installation**

Mở trình duyệt và kiểm tra:

- ✅ Frontend: http://localhost:3000
- ✅ Backend API: http://localhost:3001/api/tours
- ✅ Backend Health: http://localhost:3001/

### **🐳 Docker Deployment (Optional)**

```bash
# Build and run with Docker Compose
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f
```

### **📦 Production Build**

#### **Build Frontend:**

```bash
cd Frontend
npm run build
```

Output: `Frontend/build/` - Deploy folder này lên hosting

#### **Deploy Options:**

- **Vercel**: Frontend deployment
- **Heroku**: Full-stack deployment
- **AWS**: EC2 + S3 + CloudFront
- **DigitalOcean**: Droplet + App Platform
- **Netlify**: Frontend static hosting

---

## 📡 API Documentation

### **Base URL**
```
http://localhost:3001/api
```

### **Tours API**

#### **GET /api/tours**
Lấy danh sách tất cả tours

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "tourId": "tour_1699564800000",
      "title": "Chùa Một Cột - Hà Nội",
      "description": "...",
      "category": "Văn hóa",
      "location": { "lat": 21.0354, "lng": 105.8336 },
      "thumbnailUrl": "https://...",
      "panoramas": [...]
    }
  ]
}
```

#### **GET /api/tours/:id**
Lấy chi tiết tour với panoramas và hotspots

**Response:**
```json
{
  "success": true,
  "data": {
    "tourId": "tour_1699564800000",
    "title": "Chùa Một Cột",
    "panoramas": [
      {
        "panoramaId": "pano_001",
        "name": "Cảnh chính diện",
        "image_url": "https://...",
        "hotspots": [
          {
            "hotspotId": "hotspot_001",
            "type": "navigation",
            "title": "Đi đến cảnh tiếp theo",
            "yaw": 45.5,
            "pitch": -10.2,
            "targetPanoramaId": "pano_002"
          }
        ]
      }
    ]
  }
}
```

📖 **Full API Docs:** Xem [API_CONTRACT.md](../API_CONTRACT.md)

---

## 📂 Cấu trúc dự án

### **Frontend Structure**

```
Frontend/
├── public/
│   ├── index.html              # HTML template
│   ├── manifest.json           # PWA manifest
│   └── robots.txt
│
├── src/
│   ├── api/                    # 🔌 API Layer
│   │   ├── axiosClient.js      # Axios instance với interceptors
│   │   ├── tours.api.js        # Tours endpoints
│   │   ├── panoramas.api.js    # Panoramas endpoints
│   │   └── hotspots.api.js     # Hotspots endpoints
│   │
│   ├── components/             # 🧩 React Components
│   │   ├── Home.js             # Homepage với tour listing
│   │   ├── Navbar.js           # Navigation bar
│   │   ├── LocationIntro.js    # 360° Location intro page
│   │   ├── InteractiveMap.js   # Mapbox interactive map
│   │   ├── VRTour.js           # A-Frame VR tour viewer
│   │   └── *.css               # Component styles
│   │
│   ├── hooks/                  # 🎣 Custom React Hooks
│   │   ├── useTours.js         # Tours data management
│   │   ├── usePanoramas.js     # Panoramas state
│   │   └── useHotspots.js      # Hotspots logic
│   │
│   ├── utils/                  # 🛠️ Utility Functions
│   │   └── dataHelpers.js      # Data transformation helpers
│   │
│   ├── App.js                  # Main App component
│   ├── App.css                 # Global styles
│   ├── index.js                # Entry point
│   └── index.css               # Base CSS
│
├── .env                        # Environment variables (create this)
├── .env.example                # Environment template
├── package.json                # Dependencies
└── README_NEW.md              # This file
```

### **Backend Structure**

```
Backend/
├── Controllers/                # 🎮 Request Handlers
│   ├── tourController.js       # Tours CRUD
│   ├── panoramaController.js   # Panoramas CRUD
│   ├── hotspotController.js    # Hotspots CRUD
│   └── userController.js       # User management
│
├── Models/                     # 🗄️ Database Schemas
│   ├── tour.js                 # Tour model
│   ├── panorama.js             # Panorama model
│   ├── hotspot.js              # Hotspot model
│   └── user.js                 # User model
│
├── routes/                     # 🛤️ API Routes
│   ├── Tour.js                 # Tours routes
│   ├── Panorama.js             # Panoramas routes
│   ├── Hotspot.js              # Hotspots routes
│   └── users.js                # Users routes
│
├── services/                   # 🔧 Business Logic
│   ├── tourService.js
│   ├── panoramaService.js
│   └── hotspotService.js
│
├── repositories/               # 💾 Data Access Layer
│   ├── tourRepository.js
│   ├── panoramaRepository.js
│   └── hotspotRepository.js
│
├── middleware/                 # 🔐 Middlewares
│   ├── authMiddleware.js       # JWT authentication
│   └── cacheMiddleware.js      # Response caching
│
├── utils/                      # 🧰 Utilities
│   ├── uploadHelper.js         # File upload logic
│   └── formDataHelper.js       # Form data parsing
│
├── config/                     # ⚙️ Configuration
│   └── cloudinaryConfig.js     # Cloudinary setup
│
├── app.js                      # Express app setup
├── .env                        # Environment variables
└── package.json                # Dependencies
```

---

## 🗺️ Application Routes

| Route | Component | Mô tả |
|-------|-----------|-------|
| `/` | Home | Trang chủ - Danh sách tours |
| `/location/:tourId` | LocationIntro | Giới thiệu địa điểm 360° |
| `/interactive-map` | InteractiveMap | Bản đồ tương tác Mapbox |
| `/vr-tour/:tourId` | VRTour | Tour VR immersive |

---

## 💡 Usage Examples

### **Using Components**

#### LocationIntro Component
```jsx
import { useNavigate } from 'react-router-dom';
import LocationIntro from './components/LocationIntro';

function App() {
  const navigate = useNavigate();
  
  const handleViewLocation = (tourId) => {
    navigate(`/location/${tourId}`);
  };
  
  return <LocationIntro />;
}
```

#### InteractiveMap Component
```jsx
import InteractiveMap from './components/InteractiveMap';

function MapPage() {
  return (
    <div className="container-fluid p-0">
      <InteractiveMap />
    </div>
  );
}
```

#### VRTour Component
```jsx
import VRTour from './components/VRTour';

function VRPage() {
  return <VRTour />;
}
```

### **Using API Hooks**

```jsx
import { useTours } from './hooks/useTours';

function TourList() {
  const { tours, loading, error } = useTours();
  
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return (
    <div>
      {tours.map(tour => (
        <TourCard key={tour.tourId} tour={tour} />
      ))}
    </div>
  );
}
```

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

---

## 🐛 Debugging & Troubleshooting

### **Common Issues**

#### 1. **Mapbox không hiển thị**
```
❌ Error: "Missing Mapbox access token"
✅ Solution: Kiểm tra REACT_APP_MAPBOX_TOKEN trong .env
```

#### 2. **A-Frame panorama không load**
```
❌ Error: "CORS policy blocked"
✅ Solution: Đảm bảo Cloudinary URL public, hoặc thêm CORS headers
```

#### 3. **API connection failed**
```
❌ Error: "Network Error" hoặc "ERR_CONNECTION_REFUSED"
✅ Solution: 
  - Kiểm tra Backend đang chạy (http://localhost:3001)
  - Kiểm tra REACT_APP_API_URL trong Frontend/.env
```

#### 4. **MongoDB connection error**
```
❌ Error: "MongoServerError: Authentication failed"
✅ Solution: Kiểm tra MONGODB_URI trong Backend/.env
```

### **Debug Mode**

Bật debug logs:

```env
# Backend/.env
DEBUG=app:*
NODE_ENV=development

# Frontend/.env
REACT_APP_DEBUG=true
```

---

## 🔒 Security Best Practices

- ✅ Never commit `.env` files
- ✅ Use environment variables cho sensitive data
- ✅ Implement rate limiting trên API
- ✅ Validate & sanitize user inputs
- ✅ Use HTTPS trong production
- ✅ Keep dependencies updated (`npm audit`)
- ✅ Implement proper authentication & authorization

---

## 🚀 Performance Optimization

### **Frontend**
- ✅ Lazy load panorama images
- ✅ Implement React.memo() cho expensive components
- ✅ Use useMemo/useCallback hooks
- ✅ Optimize A-Frame scene disposal
- ✅ Code splitting với React.lazy()

### **Backend**
- ✅ Database indexing (tourId, panoramaId)
- ✅ Implement caching middleware
- ✅ Compress responses với compression
- ✅ Use CDN cho static assets (Cloudinary)
- ✅ Optimize MongoDB queries

---

## 🤝 Đóng góp

Chúng tôi hoan nghênh mọi đóng góp! Để contribute:

1. **Fork** repository
2. **Create** feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to branch (`git push origin feature/AmazingFeature`)
5. **Open** Pull Request

### **Coding Standards**

- Follow ESLint rules
- Write meaningful commit messages
- Add comments cho logic phức tạp
- Update README nếu có breaking changes
- Test trước khi commit

---

## 📝 Changelog

### **v1.0.0** (2025-12-29)
- ✨ Initial release
- ✅ Interactive map với Mapbox
- ✅ 360° panorama viewer với A-Frame
- ✅ VR tour experience
- ✅ Hotspot interactions
- ✅ Responsive design
- ✅ REST API backend

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team & Credits

**Developed by:** [Your Name/Team Name]

**Special Thanks:**
- [A-Frame](https://aframe.io/) - WebVR Framework
- [Mapbox](https://www.mapbox.com/) - Interactive Maps
- [Cloudinary](https://cloudinary.com/) - Image CDN
- [MongoDB](https://www.mongodb.com/) - Database
- [React](https://reactjs.org/) - UI Library

---

## 📞 Contact & Support

- 🌐 **Website**: https://your-domain.com
- 📧 **Email**: support@your-domain.com
- 💬 **Discord**: [Join our community](#)
- 🐛 **Issues**: [GitHub Issues](https://github.com/your-username/panorama-tourism-360/issues)

---

## 🌟 Star History

If you find this project helpful, please give it a ⭐️!

[![Star History Chart](https://api.star-history.com/svg?repos=your-username/panorama-tourism-360&type=Date)](https://star-history.com/#your-username/panorama-tourism-360&Date)

---

<div align="center">

**Made with ❤️ in Vietnam 🇻🇳**

[⬆️ Back to Top](#-panorama-tourism-360)

</div>
## 🎨 UI/UX Features

- **Gradient Design** - Modern gradient backgrounds
- **Animations** - Smooth fade-in/slide-in effects
- **Responsive** - Mobile-first design
- **Glass Morphism** - Backdrop blur effects
- **Interactive Hover** - Transform và shadow effects
- **Loading States** - Skeleton và spinner
- **Toast Notifications** - User feedback

## 🧪 Testing

```bash
npm test
```

## 📦 Build Production

```bash
npm run build
```

Build output sẽ ở thư mục `build/`

## 🐛 Debug

Kiểm tra console log:
- Network requests (Axios interceptors)
- API responses
- Component lifecycle
- A-Frame warnings

## 📝 API Contract

Frontend được xây dựng theo API Contract từ Backend:

**Response Format:**
```json
{
  "success": true,
  "data": {...},
  "message": "Optional message"
}
```

**Error Format:**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message"
  }
}
```

## 🔐 Authentication

API calls tự động gắn Bearer token từ localStorage:
```javascript
Authorization: Bearer <token>
```

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Support

- Touch controls cho panorama
- Responsive UI
- Mobile VR support
- Gyroscope support (A-Frame)

## 🚀 Performance

- Lazy loading images
- Code splitting
- Optimized re-renders
- Cached API responses (backend)

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📄 License

MIT License

## 👥 Team

Frontend Developer - Tourism 360° Project

---

**Enjoy your virtual tourism experience! 🌍✨**
