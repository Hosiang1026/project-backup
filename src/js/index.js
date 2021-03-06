/**
 * Created by ZhangJikai on 2017/2/19.
 */


import style from '../less/style.less'
import fontAwesome from 'fontAwesome'
import smoothScroll from '../../node_modules/smooth-scroll/dist/smooth-scroll.js'
import Vue from 'vue'
import project from '../components/project/project.vue'
import sidebar from '../components/sidebar/sidebar.vue'
import projectList from '../../data.json'
import config from  '../../config.json'
import eventBus from '../components/event/EventHub'

import '../../node_modules/babel-polyfill/dist/polyfill.min.js';


Vue.component("project", project);
Vue.component("sidebar", sidebar);

//var markdownReaderDesc = "* 堆的创建、插入、删除、堆排序演示\n" +
//    "* 最大堆与最小堆切换\n" +
//    "* 单步执行与自动执行\n" +
//    "* 可调节演示速度\n" +
//    "* 两种演示方式切换\n";
//markdownReaderDesc = marked(markdownReaderDesc);

//var data = [
//    {
//        "title": "Online Markdown Reader",
//        "tags": ["JS", "Tool"],
//        "content": markdownReaderDesc,
//        "source": "https://github.com/zhangjikai/online-markdown-reader",
//        "url": "http://markdown.zhangjikai.com/",
//        "desc": "测试一下效果"
//    }
//];


//let categorySet = new Set();

let categoryMap = new Map();
let categoryObjMap = {};
let showByCategory = config.category;
let newProjectList = projectList;
let isCollapse = document.body.clientWidth < 768;
//console.log(document.body.clientWidth);
//console.log(projectList);
if (showByCategory) {
    let arrList;
    let projectMap = new Map();
    for (let pro of projectList) {
        projectMap.set(pro.id, pro);
        if (pro.category == null || pro.category.trim() == "") {
            pro.category = config.defaultCategory;
        }

        if (categoryMap.has(pro.category)) {
            arrList = categoryMap.get(pro.category);
            arrList.push({
                id: pro.id,
                name: pro.name
            });

        } else {
            arrList = [];
            arrList.push({
                id: pro.id,
                name: pro.name
            });
            categoryMap.set(pro.category, arrList);

        }
    }


    for (let key of categoryMap.keys()) {
        categoryObjMap[key] = categoryMap.get(key);
    }

    newProjectList = [];

    for (let cate of categoryMap.keys()) {
        let pros = categoryMap.get(cate);
        for (let pro of pros) {
            newProjectList.push(projectMap.get(pro.id));
        }
    }
}

//console.log(projectList);

//projectList = newProjectList;


//showByCategory = false;


//console.log(categoryMap.keys());


//var categoryList = [];
//var categoryMap = {};
//
//projectList.forEach(function (project) {
//    if (project.category != null && project.category.trim() != "") {
//
//        var plist;
//        if (categoryMap.hasOwnProperty(project.category)) {
//            plist = categoryMap[project.category];
//            plist.push(project.id);
//        } else {
//            plist = [];
//            plist.push(project.id);
//            categoryMap[project.category] = plist;
//            categoryList.push(project.category);
//        }
//    }
//});


//console.log(data);

if (!config.busuanzi) {
    let footer = document.querySelector("#footer");
    footer.style.display = "none";
}

var bus = new Vue();

var app = new Vue({
    el: '#app',
    data: function () {
        return {
            projects: newProjectList,
            categoryMap: categoryObjMap,
            showByCategory: showByCategory,
            config: config,
            bus: bus

        }
    },
    methods: {
        collapseClick: function (isCollapse) {
            var container = document.querySelector("#project-container");
            var footer = document.querySelector("#footer");
            if (isCollapse) {
                container.style.marginLeft = "50px";
                footer.style.marginLeft = "50px";
            } else {
                container.style.marginLeft = "260px";
                footer.style.marginLeft = "260px";
            }


            //console.log(this.$refs);
        }
    },

    mounted: function () {

        if (config.busuanzi) {
            let windowHeight = window.innerHeight;
            let bodyHeight = document.body.offsetHeight;
            let appContent = document.querySelector("#app");
            let appHeight = appContent.offsetHeight;

            if (bodyHeight < windowHeight) {
                appContent.style.minHeight = windowHeight - bodyHeight + appHeight + "px";
            }


        }

    }


});

app.collapseClick(isCollapse);
if (!isCollapse) {
    eventBus.$emit("collapseSign", isCollapse);

}

smoothScroll.init();




