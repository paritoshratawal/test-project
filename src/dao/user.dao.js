const user_model = require('../models/user.schema');

const user_dao = {
    insert_record: async (record) => {
      const save_doc = new user_model(record);
      return await save_doc.save();
    },
    update: async (cond, update_payload) => {
      const doc = await user_model.findOne(cond).exec();
      const payload = Object.assign(doc, update_payload);
      return await payload.save();
    },
  }
  
  module.exports = user_dao;