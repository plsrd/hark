const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PermissionSchema = new Schema({
  value: { type: String, enum: ['create', 'read', 'update', 'delete'] },
});

const RoleSchema = new Schema({
  name: { type: String, required: true },
  permissions: [PermissionSchema],
});

module.exports = mongoose.model('Role', RoleSchema);
