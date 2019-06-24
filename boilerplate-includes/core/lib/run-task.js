const log = require('./log');

module.exports = function runTask(tasks_to_run, callback) {
    var success = true;
    if (tasks_to_run.length) {
        if (tasks_to_run.includes('check-scss') && tasks_to_run.includes('css')) {
            var index = tasks_to_run.indexOf('check-scss');
            if (index > -1) {
                tasks_to_run.splice(index, 1);
            }
        }
        if (tasks_to_run.includes('check-js') && tasks_to_run.includes('javascript')) {
            var index = tasks_to_run.indexOf('check-js');
            if (index > -1) {
                tasks_to_run.splice(index, 1);
            }
        }
        tasks_to_run = tasks_to_run.filter(function (value, index, self) {
            return self.indexOf(value) === index;
        });
        tasks_to_run.forEach(function (task_to_run) {
            if (task_to_run == 'javascript') {
                const check_js_task = require('../tasks/check-js');
                log.info('Starting task check-js...');
                check_js_task(function () {
                    log.info('Finished task check-js.');
                    const task = require('../tasks/' + task_to_run);
                    log.info('Starting task ' + task_to_run + '...');
                    task(function (result) {
                        if (!result) {
                            success = result;
                        }
                        log.info('Finished task ' + task_to_run + '.');
                    });
                });
            } else if (task_to_run == 'css') {
                const check_scss_task = require('../tasks/check-scss');
                log.info('Starting task check-scss...');
                check_scss_task(function () {
                    log.info('Finished task check-scss.');
                    const task = require('../tasks/' + task_to_run);
                    log.info('Starting task ' + task_to_run + '...');
                    task(function (result) {
                        if (!result) {
                            success = result;
                        }
                        log.info('Finished task ' + task_to_run + '.');
                    });
                });
            } else if (
                task_to_run == 'html' || task_to_run == 'gitignore' ||
                task_to_run == 'check-scss' || task_to_run == 'check-js' ||
                task_to_run == 'clean' || task_to_run == 'imagemin' ||
                task_to_run == 'favicon'
            ) {
                const task = require('../tasks/' + task_to_run);
                log.info('Starting task ' + task_to_run + '...');
                task(function (result) {
                    if (!result) {
                        success = result;
                    }
                    log.info('Finished task ' + task_to_run + '.');
                });
            }
        });
    }
    if (callback) {
        callback(success);
    }
};