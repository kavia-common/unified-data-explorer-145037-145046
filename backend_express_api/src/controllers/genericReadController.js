'use strict';

/**
 * Generic read-only controller for listing and fetching individual documents.
 * Accepts a Mongoose model via constructor.
 */
class GenericReadController {
  /**
   * @param {import('mongoose').Model} model
   * @param {string} resourceName
   */
  constructor(model, resourceName) {
    this.model = model;
    this.resourceName = resourceName;
  }

  // PUBLIC_INTERFACE
  /**
   * List documents with basic query support:
   * - ?limit (default 50, max 200)
   * - ?skip (default 0)
   * - ?sort (e.g., '-createdAt' or 'createdAt')
   * - ?q (JSON string query to pass to Mongo find)
   */
  async list(req, res, next) {
    try {
      const limit = Math.min(parseInt(req.query.limit || '50', 10), 200);
      const skip = parseInt(req.query.skip || '0', 10);
      const sort = req.query.sort || '-createdAt';
      let query = {};
      if (req.query.q) {
        try {
          query = JSON.parse(req.query.q);
        } catch (e) {
          return res.status(400).json({ error: 'Invalid q (JSON) parameter' });
        }
      }

      const [items, total] = await Promise.all([
        this.model.find(query).sort(sort).skip(skip).limit(limit).lean().exec(),
        this.model.countDocuments(query),
      ]);

      return res.json({
        resource: this.resourceName,
        total,
        count: items.length,
        items,
      });
    } catch (err) {
      return next(err);
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Get a single document by id.
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const doc = await this.model.findById(id).lean().exec();
      if (!doc) {
        return res.status(404).json({ error: `${this.resourceName} not found` });
      }
      return res.json(doc);
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = GenericReadController;
