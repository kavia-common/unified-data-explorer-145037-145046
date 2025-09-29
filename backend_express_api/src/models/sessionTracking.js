'use strict';

const mongoose = require('mongoose');

const SelectedReposSchema = new mongoose.Schema(
  {
    all_repositories: { type: Boolean, default: null },
    repositories: { type: [String], default: undefined },
  },
  { _id: false }
);

const SessionDataSchema = new mongoose.Schema(
  {
    llm_model: { type: String, default: null },
    session_name: { type: String, default: null },
    description: { type: String, default: null },
    platform: { type: String, default: null },
    selected_repos: { type: SelectedReposSchema, default: undefined },
  },
  { _id: false }
);

const CostHistorySchema = new mongoose.Schema(
  {
    timestamp: { type: Date, default: null },
    agent_costs: { type: mongoose.Schema.Types.Mixed, default: null },
    total_cost: { type: Number, default: null },
  },
  { _id: false }
);

const SessionTrackingSchema = new mongoose.Schema(
  {
    task_id: { type: String, index: true, default: null },
    tenant_id: { type: String, default: null },
    organization_name: { type: String, default: null },
    user_id: { type: String, default: null },
    User_name: { type: String, default: null }, // preserved case from Excel
    project_id: { type: String, default: null },
    container_id: { type: String, default: null },
    service_type: { type: String, default: null },
    session_start: { type: Date, default: null },
    session_end: { type: Date, default: null },
    status: { type: String, default: null },
    total_cost: { type: Number, default: null },
    agent_costs: { type: mongoose.Schema.Types.Mixed, default: null },
    cost_history: { type: [CostHistorySchema], default: undefined },
    last_updated: { type: Date, default: null },
    session_data: { type: SessionDataSchema, default: undefined },
    created_at: { type: Date, default: null },
  },
  { timestamps: true, collection: 'session_tracking' }
);

module.exports =
  mongoose.models.SessionTracking ||
  mongoose.model('SessionTracking', SessionTrackingSchema);
