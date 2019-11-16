const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const todosRouter = require('./routes/todos');

const app = express();
const PORT = 3100;

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter)
app.use('/users', usersRouter);
app.use('/todos', todosRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({
    payload: "Nothing found here =(. The endpoint or method is unhandled by the Server",
    err: true
  })
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err)
  res.status(err.status || 500);
  res.json({
    payload: {
      err: err,
      errStack: err.stack
    },
    err: true
  });
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`)
})

module.exports = app;
