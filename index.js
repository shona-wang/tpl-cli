#!/usr/bin/env node
const program = require('commander')
const shell = require('shelljs')

program
    .version('1.0.0')
    .description('输入命令下载模板')
program
    .command('* <tpl>')
    .action(function (tpl) {
        // installPath当前目录，projectName git中项目的名称, tplPath模板所在的路径
        let installPath = shell.pwd(),
            projectName = 'commonTemplate',
            tplPath = `${projectName}/templates/src/components/${tpl}.vue`;
        if (!shell.which('git')) {
            shell.echo('Error：未检测到Git工具，请先安装Git')
            shell.exit(1)
        }
        if (tpl) {
            // 先判断是否有模板文件，如果有模板文件先进行删除
            let hadTplPath = `${installPath}/${tpl}.vue`;
            let gitPath = `https://github.com/shona-wang/${projectName}.git`;
            if (shell.exec(`git clone ${gitPath}`).code !== 0) {
                shell.echo('Error: git clone 失败，请检查网络')
                shell.exit(1)
            }
            // 复制./cli/templates/src/components/${tpl}.vue到当前目录
            shell.cp(`./${tplPath}`, installPath);
            // 删除 ./cli目录
            shell.rm('-rf', `./${projectName}`);
            console.info('下载完成');
            console.info('');
        } else {
            console.error('正确命令例子：tpl-cli tablePage')
        }
    })
program.parse(process.argv)
