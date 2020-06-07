const { Text, Checkbox, Password } = require('@keystonejs/fields');
const access = require('../utils/access');

module.exports = {
  fields: {
    name: { type: Text },
    content: { type: Text }
  },
  // List-level access controls
  access: {
    read: true,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
}