const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'html'));

const names = [];
const tasks = [];

function renderIndex(res, options = {}) {
    res.render('index', { names, tasks, error: '', ...options });
}

app.get('/', (req, res) => {
    renderIndex(res);
});

app.get('/greet', (req, res) => {
    const name = req.query.name?.trim();

    if (name) {
        console.log(name);
        names.push(name);
    }

    res.redirect('/');
});

app.get('/greet/:index', (req, res, next) => {
    const index = Number.parseInt(req.params.index, 10);

    if (!Number.isInteger(index) || index < 0 || index >= names.length) {
        return next(new Error('That person is not in the greeting list.'));
    }

    res.render('wazzup', { name: names[index] });
});

app.post('/task', (req, res) => {
    const task = req.body.task?.trim();

    if (task) {
        tasks.push(task);
    }

    res.redirect('/');
});

app.get('/task', (req, res) => {
    res.json(tasks);
});

app.delete('/task/:index', (req, res) => {
    const index = Number.parseInt(req.params.index, 10);

    if (Number.isInteger(index) && index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
    }

    res.redirect('/');
});

app.post('/task/:index/:direction', (req, res) => {
    const index = Number.parseInt(req.params.index, 10);
    const offset = req.params.direction === 'up' ? -1 : 1;
    const destination = index + offset;

    if (Number.isInteger(index) && index >= 0 && destination >= 0 && destination < tasks.length) {
        [tasks[index], tasks[destination]] = [tasks[destination], tasks[index]];
    }

    res.redirect('/');
});

app.put('/greet/:name', (req, res) => {
    names.push(req.params.name);
    res.json(names);
});

app.use((error, req, res, next) => {
    renderIndex(res, { error: error.message });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
