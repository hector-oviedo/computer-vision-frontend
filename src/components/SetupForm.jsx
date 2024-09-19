import React from 'react';
import { FiFolder, FiFile } from 'react-icons/fi';

const SetupForm = ({ isOpen, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <div
      className={`popup fixed inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out ${
        isOpen ? 'opacity-100 bg-black bg-opacity-50' : 'opacity-0 pointer-events-none'
      }`}
    >
      <section
        className={`relative bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl h-4/5 transform transition-all duration-300 ease-in-out ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
          onClick={handleClose}
          aria-label="Close"
        >
          &times;
        </button>

        {/* Popup title */}

        {/* Scrollable content */}
        <div className="overflow-y-auto h-full w-full">
          <div className="space-y-6 text-gray-800 dark:text-gray-200">
            {/* Project Structure */}
            <div>
              <h2 className="font-bold mb-4 text-center text-2xl">Usage Instructions</h2>
              <h3 className="font-semibold mb-2">Project Structure</h3>
              <h4>Your project folder contains the following structure:</h4><br />
              <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm overflow-auto">
                <FiFolder className="inline-block mr-2" />public
                <br />
                └── <FiFile className="inline-block mr-2" />config.json
                <br />
                <FiFolder className="inline-block mr-2" />output
                <br />
                └── <FiFolder className="inline-block mr-2" />logs
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;└── <FiFile className="inline-block mr-2" />modelname.json
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...
                <br />
                └── <FiFolder className="inline-block mr-2" />frames
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;└── <FiFolder className="inline-block mr-2" />modelname
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── <FiFile className="inline-block mr-2" />frame_0000.png
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── <FiFile className="inline-block mr-2" />frame_0001.png
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...
              </pre> <small>Frames should be named as `frame_n.png`, where `n` is the frame number (from 0000 to 9999).</small><br />
            </div>
           

            <div>
              <h3>config.json format:</h3>
              <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm overflow-auto">
{`{
  "rawFramesPath": "/frames",
  "modelsOutputs": "/output/logs",
  "modelsInferenceFramesPath": "/output/frames/",
  "models": [
    "modelname",
    ...
  ]
}`}
              </pre>
            </div>

            {/* Log Files */}
            <div>
              <h3>Logs file format:</h3>
              <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm overflow-auto">
{`{
  "device": "cuda",
  "model": "modelname",
  "total_frames": 0000,
  "total_inference_time_ms": 0000.00,
  "total_time_ms": 0000.00,
  "total_gpu_memory_used": 000.00,
  "total_gpu_memory_cached": 000.00,
  "frames": [
    {
      "frame_number": 0,
      "inference_time_ms": 0.00,
      "total_time_ms": 0.00,
      "cpu_usage": 0.0,
      "cpu_ram_usage": 0.0,
      "gpu_vram_usage": 0.0,
      "gpu_vram_reserved": 0.0,
      "detections": [
        {
          "label": "",
          "box": [
            0,
            0,
            0,
            0
          ],
          "score": 0
        },
        ...
      ]
    },
    ...
  ]
}`}
              </pre>
            </div>

            {/* Important Notes */}
            <div>
              <h3 className="font-semibold mb-2">Important Notes</h3>
              <ul className="list-disc ml-5">
                <li>
                  Make sure all frames are saved in the <strong>PNG</strong> format and follow the naming convention `frame_n.png`.
                </li>
                <li>
                  Ensure that the log files are correctly formatted; otherwise, the project will not function properly.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SetupForm;
