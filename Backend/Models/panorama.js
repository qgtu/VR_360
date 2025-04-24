const mongoose = require('mongoose');

const panoramaSchema = new mongoose.Schema({
    panoramaId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    imageUrl: {
        type: String,
        required: true
    },
    thumbnailUrl: String,
    previewUrl: String,
    location: {
        lat: Number,
        lng: Number
    },
    category: {
        type: String,
        enum: ['beaches', 'mountains', 'cities', 'cultural'],
        default: 'cultural'
    },
    audioUrl: String,
    publicId: String,
    audioPublicId: String,
    initialCamera: {
        lat: { type: Number, default: 0 },
        lng: { type: Number, default: 0 }
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function(doc, ret) {
            ret.id = ret.panoramaId;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    },
    toObject: { virtuals: true } // Đảm bảo virtuals cũng hoạt động khi chuyển đổi sang Object
});

// Định nghĩa virtual để kết nối với Hotspots
panoramaSchema.virtual('hotspots', {
    ref: 'Hotspot',        // Model cần tham chiếu đến
    localField: 'panoramaId', // Trường trong model Panorama
    foreignField: 'panoramaId' // Trường trong model Hotspot
});

// Index để tối ưu truy vấn
panoramaSchema.index({ panoramaId: 1 });
panoramaSchema.index({ category: 1 });
panoramaSchema.index({ 'location.lat': 1, 'location.lng': 1 });

// Pre-save hook để tự động tạo panoramaId nếu chưa có
panoramaSchema.pre('save', function(next) {
    if (!this.panoramaId) {
        this.panoramaId = `panorama_${Date.now()}`;
    }
    next();
});

module.exports = mongoose.model('Panorama', panoramaSchema);
