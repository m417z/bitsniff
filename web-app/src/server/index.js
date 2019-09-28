const express = require('express');
const multer = require('multer');
const os = require('os');
const { execFile } = require('child_process');
const stream = require('stream');

const app = express();
const upload = multer({
  limits: { fieldSize: 1024 * 1024 * 1024 } // 1GB ought to be enough for anybody
});

app.use(express.static('dist'));

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.post('/api/analyzeNetworkLog', upload.single('log'), (req, res) => {
  const args = ['analyze.py'];
  const options = { cwd: '../engine' };
  const child = execFile('python', args, options, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      console.log(err);
      console.log('execFile error');
      res.status(500).send('Oh uh, something went wrong - could not run analyzer');
      return;
    }

    // the *entire* stdout and stderr (buffered)
    //console.log(`stdout: ${stdout}`);
    //console.log(`stderr: ${stderr}`);

    try {
      res.send(JSON.parse(stdout));
    } catch (e) {
      console.log('JSON parse error');
      console.log(e);
      console.log('Data', stdout);
      res.status(500).send('Oh uh, something went wrong - invalid result');
    }
  });

  const stdinStream = new stream.Readable();
  stdinStream.push(req.file.buffer);  // Add data to the internal queue for users of the stream to consume
  stdinStream.push(null);             // Signals the end of the stream (EOF)
  stdinStream.pipe(child.stdin);
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
