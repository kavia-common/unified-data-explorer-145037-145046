#!/bin/bash
cd /home/kavia/workspace/code-generation/unified-data-explorer-145037-145046/backend_express_api
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

