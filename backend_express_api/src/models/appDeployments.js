'use strict';

const mongoose = require('mongoose');

const AppDeploymentsSchema = new mongoose.Schema(
  {
    app_id: { type: String, index: true, default: null },
    app_url: { type: String, default: null },
    artifact_path: { type: String, default: null },
    branch_name: { type: String, default: null },
    build_path: { type: String, default: null },
    command: { type: String, default: null },
    created_at: { type: Date, default: null },
    custom_domain: { type: String, default: null },
    deployment_id: { type: String, default: null },
    job_id: { type: String, default: null },
    message: { type: String, default: null },
    project_id: { type: String, default: null },
    project_name: { type: String, default: null },
    root_path: { type: String, default: null },
    status: { type: String, default: null },
    subdomain: { type: String, default: null },
    task_id: { type: String, default: null },
    tenant_id: { type: String, default: null },
    tenant_name: { type: String, default: null },
    updated_at: { type: Date, default: null },
    artifact_count: { type: Number, default: null },
    domain_status: { type: String, default: null },
    domain_checked_at: { type: Date, default: null },
  },
  { timestamps: true, collection: 'app_deployments' }
);

module.exports =
  mongoose.models.AppDeployments ||
  mongoose.model('AppDeployments', AppDeploymentsSchema);
