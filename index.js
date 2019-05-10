#!/usr/bin/env node
const $path = require('path')
const $inquirer = require('inquirer'); // 对话交互
const $program = require('commander'); //node.js命令行界面的完整解决方案
const $download = require('download-git-repo'); // 模板下载工具
const $colors = require('colors'); // 改变输出颜色
const $shell = require('shelljs');

// 后台管理模板
const adminTpl = "https://github.com:2020807070/cchao-blog#master"
// 博客模板
const vuepressTpl = "https://github.com:2020807070/cchao-blog#master"

const $package = require($path.resolve(__dirname, '../package.json')) // 动态获取

$program.version('1.0.0', '-v, --version')
  .command('init')
  .action(() => {
    $inquirer.prompt(
      [{
        type: 'list',
        name: 'type',
        message: '请选择你要创建的项目:',
        choices: [
          '后台管理系统',
          'Vuepress博客'
        ]
      },
      {
        message: '请输入项目名称:',
        name: 'name',
        validate: function (cm) {
          if (!cm && cm.trim() === '') return '项目名称不能为空'
          return true
        }
      },
      {
        message: '请输入项标题:',
        name: 'name',
        validate: function (cm) {
          if (!cm && cm.trim() === '') return '项目描述不能为空'
          return true
        }
      },
      {
        type: 'confirm',
        name: 'moveon',
        message: '是否继续?'
      }]
    ).then(answers => {
      if (!answers.moveon) {
        $shell.echo(`您终止了${answers.type} --> ${answers.name} 的创建!`.red)
        process.exit(1)
      }
      if (answers.type === '后台管理系统') {
        $download(adminTpl, answers.name, { clone: true }, (err) => {
          console.log(err ? 'Error' : 'Success')
        })
      }
      if (answers.type === 'Vuepress博客') {
        downLoadTemplate(vuepressTpl,2)
      }
      // console.log(answers); // 返回的结果
    })
  });
$program.parse(process.argv);