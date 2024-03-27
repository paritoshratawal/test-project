const agent_model = require('../models/agent.schema');

const agent_dao = {
    insert_record: async (record) => {
      const save_doc = new agent_model(record);
      return await save_doc.save();
    },
    update: async (cond, update_payload) => {
      const doc = await agent_model.findOne(cond).exec();
      const payload = Object.assign(doc, update_payload);
      return await payload.save();
    },
  }
  
  module.exports = agent_dao;