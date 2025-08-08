module.exports = {
  "cmds": {
    "nvidia": "uv pip install torch==2.7.0 torchvision==0.22.0 torchaudio==2.7.0 xformers --index-url https://download.pytorch.org/whl/cu128",
    "amd": "uv pip install torch==2.3.1 torchvision==0.18.1 torchaudio==2.3.1 --index-url https://download.pytorch.org/whl/rocm6.0",
    "default": "uv pip install torch==2.3.1 torchvision==0.18.1 torchaudio==2.3.1 --index-url https://download.pytorch.org/whl/cpu"
  },
  "run": [{
    "method": "shell.run",
    "params": {
      "message": "git clone https://huggingface.co/spaces/cocktailpeanut/BRIA-RMBG-1.4 app"
    }
  }, {
    "method": "shell.run",
    "params": {
      "venv": "env",
      "path": "app",
      "message": [
        "{{(gpu === 'nvidia' ? self.cmds.nvidia : ((gpu === 'amd' && platform === 'linux') ? self.cmds.amd : self.cmds.default))}}",
        "uv pip install -r requirements.txt",
        "uv pip install pydantic==2.10.6"
      ]
    }
  }, {
    "method": "fs.share",
    "params": {
      "venv": "app/env"
    }
  }, {
    "method": "notify",
    "params": {
      "html": "Click the 'start' tab to get started!"
    }
  }]
}
