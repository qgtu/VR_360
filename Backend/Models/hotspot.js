const mongoose = require('mongoose');

const hotspotSchema = new mongoose.Schema({
    panoramaId: {
        type: String,
        required: true,
        ref: 'Panorama'  // Tham chiếu đến model Panorama
    },
    type: {
        type: String,
        required: true,
        enum: ['scene', 'info', 'image', 'video']
    },
    position: {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        z: { type: Number, required: true }
    },
    title: String,
    description: String,
    targetSceneId: {
        type: String,
        ref: 'Panorama'  // Tham chiếu đến panorama đích nếu là hotspot kiểu scene
    },
    url: String
}, { 
    timestamps: true,
    toJSON: {
        virtuals: true,  // Thêm virtuals để đảm bảo kết nối được hiển thị khi chuyển sang JSON
        transform: function(doc, ret) {
            ret.id = doc._id;  // Thêm id để frontend dễ sử dụng
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    },
    toObject: { virtuals: true }
});

// Virtual để tham chiếu ngược lại đến Panorama
hotspotSchema.virtual('panorama', {
    ref: 'Panorama',
    localField: 'panoramaId',
    foreignField: 'panoramaId',
    justOne: true  // Mỗi hotspot chỉ thuộc một panorama
});

// Virtual để tham chiếu đến scene đích nếu có
hotspotSchema.virtual('targetScene', {
    ref: 'Panorama',
    localField: 'targetSceneId',
    foreignField: 'panoramaId',
    justOne: true
});

// Index để tối ưu truy vấn
hotspotSchema.index({ panoramaId: 1 });

module.exports = mongoose.model('Hotspot', hotspotSchema);
