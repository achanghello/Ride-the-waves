<template>
    <canvas id="container" ></canvas>
 </template>
       
     <script>
// import mess from './map.json'
   export default {
     mounted(){
        let canvas = document.querySelector('#container')
        let canvasW = canvas.width = window.innerWidth*0.42857
        let canvasH = canvas.height = window.innerHeight*0.9
        let geoCenterX = 0, geoCenterY = 0  // 地图区域的经纬度中心点
        let scale = 1   // 地图缩放系数
        let geoData = []
        let offsetX = 0, offsetY = 0    // 鼠标事件的位置信息
        let eventType = ''  // 事件类型
        let ctx = canvas.getContext('2d')
        var data={
            dataSets: [
                
            ]
        };
        //var arr2=[{Name:"新疆维吾尔自治区",Age:12},{Name:"小蜗牛",Age:9}]


        // 地图绘制入口方法
        function init() {
            let request = new XMLHttpRequest()
            request.open('get','https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
            request.setRequestHeader('referer', 'no-referer')
            request.send()
            request.onload = function () {
                if (request.status === 200) {
                    geoData = JSON.parse(request.responseText)
                    getBoxArea()
                    drawMap()
                }
            }

            // geoData = mess
            //         getBoxArea()
            //         drawMap()
        }

        // 分三步，清空画布、绘制地图各子区域、标注城市名称
        function drawMap() {
            ctx.clearRect(0, 0, canvasW, canvasH)
            // 画布背景
            ctx.fillStyle = '#06164a'
            ctx.fillRect(0, 0, canvasW, canvasH)
            drawArea()
            drawText()
        }

        // 绘制地图各子区域
        var drawArea = () => {
            let dataArr = geoData.features
            let cursorFlag = false
            for (let i = 0; i < dataArr.length; i++) {
                let centerX = canvasW / 2
                let centerY = canvasH / 2
                dataArr[i].geometry.coordinates.forEach(area => {
                    ctx.save()
                    ctx.beginPath()
                    ctx.translate(centerX, centerY)
                    area[0].forEach((elem, index) => {
                        let position = toScreenPosition(elem[0], elem[1])
                        if (index === 0) {
                            ctx.moveTo(position.x, position.y)
                        } else {
                            ctx.lineTo(position.x, position.y)
                        }
                    })
                    ctx.closePath()
                    ctx.strokeStyle = '#00cccc'
                    ctx.lineWidth = 1
                    // 将鼠标悬浮的区域设置为橘黄色
                    if (ctx.isPointInPath(offsetX, offsetY)) {
                        cursorFlag = true
                        ctx.fillStyle = 'orange'
                        //console.log('1')
                        if (eventType === 'click') {
                            // console.log(dataArr[i].properties.name)
                            this.$emit('showdata',dataArr[i].properties.name)
                            ctx.fillStyle = 'pink'
                            //ctx.fillStyle = 'red'
                            ctx.font = '15px 宋体'
                            

                            ctx.textAlign = 'center'
                            ctx.textBaseLine = 'center'
                            let n1=dataArr[i].properties.name
                            let textInc='今日新增:'
                            let textRec='今日治愈:'
                            ctx.fillText(n1+textInc+'11', -220, 100);
                            ctx.fillText(n1+textRec+'200', -220, 120);
                            //ctx.fillText='111'
                        }
                    } else {
                        ctx.fillStyle = '#004444'
                    }
                    ctx.fill()
                    ctx.stroke()
                    ctx.restore()
                });
                // 动态设置鼠标样式
                if (cursorFlag) {
                    canvas.style.cursor = 'pointer'
                } else {
                    canvas.style.cursor = 'default'
                }
            }
        }
        // 标注地图上的城市名称
        function drawText() {
            let centerX = canvasW / 2
            let centerY = canvasH / 2
            geoData.features.forEach(item => {
                ctx.save()
                ctx.beginPath()
                ctx.translate(centerX, centerY) // 将画笔移至画布的中心
                ctx.fillStyle = '#fff'
                ctx.font = '14px Microsoft YaHei'
                ctx.textAlign = 'center'
                ctx.textBaseLine = 'center'
                let x = 0, y = 0
                //  因不同的geojson文件中中心点属性信息不同，这里需要做兼容性处理
                if (item.properties.cp) {
                    x = item.properties.cp[0]
                    y = item.properties.cp[1]
                } else if (item.properties.centroid) {
                    x = item.properties.centroid[0]
                    y = item.properties.centroid[1]
                } else if (item.properties.center) {
                    x = item.properties.center[0]
                    y = item.properties.center[1]
                }
                
                let position = toScreenPosition(x, y)
                ctx.fillText(item.properties.name, position.x, position.y);
                ctx.restore()
            })
        }

        // 将经纬度坐标转换为屏幕坐标
        function toScreenPosition(horizontal, vertical) {
            return {
                x: (horizontal - geoCenterX) * scale,
                y: (geoCenterY - vertical) * scale
            }
        }

        // 获取包围盒范围，计算包围盒中心经纬度坐标，计算地图缩放系数
        function getBoxArea() {
            let N = -90, S = 90, W = 180, E = -180
            geoData.features.forEach(item => {
                // 将MultiPolygon和Polygon格式的地图处理成统一数据格式
                if (item.geometry.type === 'Polygon') {
                    item.geometry.coordinates = [item.geometry.coordinates]
                }
                // 取四个方向的极值
                item.geometry.coordinates.forEach(area => {
                    let areaN = - 90, areaS = 90, areaW = 180, areaE = -180
                    area[0].forEach(elem => {
                        if (elem[0] < W) {
                            W = elem[0]
                        }
                        if (elem[0] > E) {
                            E = elem[0]
                        }
                        if (elem[1] > N) {
                            N = elem[1]
                        }
                        if (elem[1] < S) {
                            S = elem[1]
                        }
                    })
                })
            })
            // 计算包围盒的宽高
            let width = Math.abs(E - W)
            let height = Math.abs(N - S)
            let wScale = canvasW / width
            let hScale = canvasH / height
            // 计算地图缩放系数
            scale = wScale > hScale ? hScale : wScale
            // 获取包围盒中心经纬度坐标
            geoCenterX = (E + W) / 2
            geoCenterY = (N + S) / 2
        }

        // 滚轮缩放事件
        // canvas.addEventListener('mousewheel', function (event) {
        //     if (event.deltaY > 0) {
        //         if (scale > 10) {
        //             scale -= 10
        //         }
        //     } else {
        //         scale += 10
        //     }
        //     eventType = 'mousewheel'
        //     drawMap()
        // })

        // 鼠标移动事件
        canvas.addEventListener('mousemove', function (event) {
            offsetX = event.offsetX//鼠标横坐标
            offsetY = event.offsetY//鼠标纵坐标
            eventType = 'mousemove'//鼠标事件移动类型
            drawMap()//重新绘制
            //ctx.fillStyle = 'red'
            //ctx.font = '12px Microsoft YaHei'
            //ctx.textAlign = 'center'
            //ctx.textBaseLine = 'center'
            //let textinfoemation='今日新增'
            //ctx.fillText(textinfoemation+"11", offsetX, offsetY);
        })

        // 鼠标点击事件
        canvas.addEventListener('click', function (event) {
            offsetX = event.offsetX
            offsetY = event.offsetY
            eventType = 'click'
            //ctx.fillText("11", offsetX, offsetY);
            drawMap()
            /*let centerX = canvasW / 2
            let centerY = canvasH / 2
            geoData.features.forEach(item => {
                if(item.properties.name=='广西壮族自治区'){

                
                ctx.save()
                ctx.beginPath()
                ctx.translate(centerX, centerY) // 将画笔移至画布的中心
                ctx.fillStyle = 'red'
                ctx.font = '14px Microsoft YaHei'
                ctx.textAlign = 'center'
                ctx.textBaseLine = 'center'
                let x = 0, y = 0
                //  因不同的geojson文件中中心点属性信息不同，这里需要做兼容性处理
                if (item.properties.cp) {
                    x = item.properties.cp[0]
                    y = item.properties.cp[1]
                } else if (item.properties.centroid) {
                    x = item.properties.centroid[0]
                    y = item.properties.centroid[1]
                } else if (item.properties.center) {
                    x = item.properties.center[0]
                    y = item.properties.center[1]
                }
                let position = toScreenPosition(x, y)
                //ctx.fillText(item.properties.name, position.x, position.y);
                ctx.fillText(item.properties.name, position.x+100, position.y);
                ctx.restore()
            }
            })*/
            /*if(arr2[0].Name==geoData.features.item.name){
                ctx.fillStyle = 'red'
                ctx.font = '12px Microsoft YaHei'
                ctx.textAlign = 'center'
                ctx.textBaseLine = 'center'
                let textinfoemation='今日新增'
                ctx.fillText(textinfoemation+arr2.Age, 90, 450);
            }*/

            //ctx.fillStyle = 'red'
            //ctx.font = '12px Microsoft YaHei'
            //ctx.textAlign = 'center'
            //ctx.textBaseLine = 'center'
            //let textinfoemation='今日新增'
            //ctx.fillText(textinfoemation+"11", 90, 450);
        })

        
        init()
     },
     methods:{
        
     }
   }
   </script>
     
   <style lang="scss" scoped>
   </style>
       
      