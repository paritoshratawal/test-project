const policy_model = require('../models/policy.shema');

const policy_dao = {
    insert_record: async (record) => {
      const save_doc = new policy_model(record);
      return await save_doc.save();
    },
    update: async (cond, update_payload) => {
      const doc = await policy_model.findOne(cond).exec();
      const payload = Object.assign(doc, update_payload);
      return await payload.save();
    },
  }
  
  module.exports = policy_dao;