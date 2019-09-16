<template>
    <div id="calender">
        <div id="celender_head">
            <div id="left" class="celender_head" @click="left()">←</div>
            <div id="celender_head_inner" class="celender_head">
                <span class="font-class">{{header}}</span>
            </div>
            <div id="right" class="celender_head" @click="right()">→</div>
        </div>
        <!---->
        <div id="calender_body">
            <table>
                <!--日历头部-->
                <tr class='head'>
                    <td v-for="head in heads" >{{head}}</td>
                </tr>
                <!--日历日期-->
                <tr v-for="item in show">
                    <td :class="{now: item1.now, last_month:item1.attr == 'last_month',next_month:item1.attr == 'next_month'}" v-for="item1 in item "
                        :bgcolor="(item1.attr == 'last_month' || item1.attr == 'next_month') ? '': colorcheange(item1.num)">
                        <!--点击日历数据-->
                        <span style="display: inline-block;width: 100%" @click="(item1.attr == 'last_month' || item1.attr == 'next_month') ? '': consoleNumclass(item1.num)">
                            {{item1.num}}
                        </span>
                    </td>
                </tr>
            </table>
        </div>
        <div id="calender_foot">
            <div class="calen-left">
                <div><span class="coder-fontr">优：</span> <span class="calend-quan">22</span></div>
                <div><span class="coder-fontr">中度：</span> <span class="calend-quan">22</span></div>
            </div>
            <div class="calen-left">
                <div><span class="coder-fontr">良：</span> <span class="calend-quan">22</span></div>
                <div><span class="coder-fontr">重度：</span> <span class="calend-quan">22</span></div>
            </div>
            <div class="calen-left">
                <div><span class="coder-fontr">轻度：</span> <span class="calend-quan">22</span></div>
                <div><span class="coder-fontr">严重：</span> <span class="calend-quan">22</span></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'calender',
        //
        data (){
            return {
                //
                body:'',
                //
                header:'',
                //
                currentYear:'',
                //
                currentMonth:'',
                //
                currentDay:'',
                //
                heads:["日","一","二","三","四","五","六"],
                //
                datas:new Array(),
                //
                show:new Array(),
            }
        },
        //
        created(){
            this.setCalender(new Date())
        },
        //
        methods:{
            //
            initline (){
                this.datas=new Array()
                this.show=new Array();

            },
            //点击日历
            consoleNumclass(val){
                console.log(val);
                let p = (function getMousePos(event) {
                    var e = event || window.event;
                    return {'x':e.clientX,'y':e.clientY}
                })()
                console.log(p);
            },
            //
            colorcheange(num){
                let color;
                if (num >= 0 && num <=10){
                    color = '#666';
                } else if(num >=11 && num <=20){
                    color = 'blue'
                } else if(num >=21 && num <=31){
                    color = 'yellow'
                }
                return color
            },
            //
            backToday (){
                this.setCalender(new Date())
            },
            //
            getcurrentDates (calender_Date) {//传入正常的Date（）类型数据
                this.initline()
                let months=calender_Date.getMonth();
                months=months+1;
                calender_Date.setMonth(months);
                calender_Date.setDate(0)
                ///
                return calender_Date.getDate();
            },
            //
            getlastDates (calenderdDate) {//传入正常的Date（）类型数据
                let curDate = calenderdDate;
                curDate.setDate(0);
                return curDate.getDate();
            },
            //
            left(){
                this.initline()
                let yy=this.currentYear;
                let mm=this.currentMonth;
                let dd=1
                if(yy==new Date().getFullYear()&&mm==new Date().getMonth()+1){
                    dd=new Date().getDate();
                }
                if(mm==0){
                    mm=12;yy=yy-1;
                    this.currentMonth=mm;
                    this.currentYear=yy;
                }
                let calenderrDate=yy+"-"+mm+"-"+dd;
                this.setCalender(new Date(calenderrDate));
            },
            right (){
                this.initline()
                let yy=this.currentYear;
                let mm=this.currentMonth+2;
                let dd=1
                if(yy==new Date().getFullYear()&&mm==new Date().getMonth()+1){
                    dd=new Date().getDate();
                }
                if(mm>12){
                    mm=1;yy++;
                    this.currentMonth=mm;
                    this.currentYear=yy;
                }
                let calender__Date=yy+"-"+mm+"-"+dd;
                this.setCalender(new Date(calender__Date));
            },
            setCalender (dateNow){
                //显示日历部分
                let firstday;
                let today = dateNow;
                let yy = today.getFullYear();
                this.currentYear=yy;
                let mm = today.getMonth() + 1;//today=2;mm=3
                this.currentMonth=mm-1;//this.curr=2
                let dd = today.getDate();
                this.currentDay=dd;//30
                firstday = yy + "-" + mm + "-1";//2018-3-1
                //本月第一天是星期几,也表示前面有几个空的天数
                let firstday_day = new Date(firstday).getDay();
                //日历头
                this.header=yy+"年"+mm+"月";
                let cur_days = this.getcurrentDates(today);
                //上一月有多少天
                let last_days = this.getlastDates(dateNow);

                //上个月从哪天开始出现
                let last_first_day = last_days - firstday_day + 1;
                //firstline
                //存上个月的日期
                for (let i = last_first_day; i <= last_days;i++) {
                    let date=new Object();
                    date.num=i;
                    date.attr='last_month'
                    date.now=false
                    this.datas.push(date);
                    // this.dateData.firstline.push(date);
                }
                //temp存放换行前上一个数据
                //下一行第一个数字
                let num_second = 7 - firstday_day + 1;
                //存本月日期
                for (let i = 1; i <= cur_days; i++) {
                    let date=new Object();
                    date.num=i;
                    date.attr='this_month'
                    if(i == this.currentDay && this.currentMonth == new Date().getMonth()&&this.currentYear==new Date().getFullYear()){
                        date.now=true
                    }else{
                        date.now=false
                    }
                    this.datas.push(date);
                }
                for(let i=1;i<=42-cur_days-(last_days-last_first_day+1);i++){
                    let date=new Object();
                    date.num=i;
                    date.attr='next_month'
                    this.datas.push(date);
                }

                let k=0;
                for(let i=0;i<6;i++){
                    let line=new Array();
                    for(let j=0;j<7;j++){
                        line.push(this.datas[k++]);
                    }
                    this.show.push(line);
                }

            }
        },


    }
</script>
<style lang="scss" scoped>


    #calender{
        width: 280px;
        #celender_head{
            height: 40px;
            width: 100%;
            .celender_head{
                line-height: 40px;
                text-align: center;
                height: 40px;
                .font-class{
                    width: 100px;
                    font-weight: bold;
                    font-size: 14px;
                    color: #666;
                }
            }

            #left{
                height: 40px;
                width: 40px;
                float: left;
            }

            #celender_head_inner{
                height: 40px;
                width: 80px;
                float: left;
                margin-left: 60px;

            }

            #right{
                height: 40px;
                width: 40px;
                float: left;
                margin-left: 60px
            }

            p{
                color: white;
                font-size: 10px;
                text-align: center;
            }
        }

        #calender_body {

            .head td:hover{
                background-color: rgb(248,248,248)
            }

            td{
                width: 40px;
                height: 40px;
                text-align: center;
                line-height: 40px;
                font-weight: bold;
                &:hover{
                    background-color: red;
                }
                &.now {
                    color: red;
                }

            }
            .last_month {
                color:lightgray;
                &:hover {
                    background-color: rgb(248,248,248)
                }
            }

            .next_month{
                color:lightgray;
                &:hover {
                    background-color: rgb(248,248,248)
                }
            }
        }


        #calender_foot{
            width: 100%;
            height: 60px;
            .calen-left{
                text-align: right;
                float: left;
                height: 30px;
                width: 33.33333333%;
                .coder-fontr{
                    font-size: 12px;
                }
                .calend-quan{
                    display: inline-block;
                    line-height: 24px;
                    text-align: center;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: #1ce405;
                    padding: 0px;
                }
            }
        }
    }

</style>