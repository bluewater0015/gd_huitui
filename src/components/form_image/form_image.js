
//form_image.js
import './form_image.css';
import React,{ Component } from 'react';
import Dropzone from 'react-dropzone';
import closeImg from './images/close1.png';
import ImageCompressor from '@xkeshi/image-compressor';

export default class FormImage extends Component{
	constructor(props){
		super(props);
		//console.log('11',this.props);
		this.state ={
			form:{
				name: '',
				files: [],
				Files: [],
			},
			//派发的图片放大
			distributePic: [],
			//设备图片放大
			equipmentPic: [],
			//卫生图片放大
			healthPic: [],
			//竞品价格图片放大
			pricePic: []

		}
	}
	componentDidMount() {
		//标示第一次加载
		this.first = true;
		
	}
	
	componentWillReceiveProps(props) {
		//console.log('props',props);
		//console.log(1);
		let distributeImages = props.distributeImages;
		//没有上传图片时，就拿到后台给的图片
		//上传图片了，isget就变为false，就不会执行下面

		if(distributeImages && distributeImages.length && !this.isget && this.first) {
			//第一次接受父组件传过来的值，之后就不再执行
			this.first = false;
			this.setState({
				...this.state, form: {
			        ...this.state.form,
			        files: this.state.form.files.concat(distributeImages)
			    }
			})
		}
		
	
	}
	// handleNameChange(e) {
	// 	this.setState({
	// 		...this.state,
	// 		form: {
	// 			...this.state.form,
	// 			name: e.target.value
	// 		}
	// 	})
	// }

	//提交
	// handleSubmit() {
	//     let formData = new FormData();
	//     formData.append("name", this.state.form.name)
	//     this.state.form.files.forEach(f =>
	//       formData.append("file", f)
	//     )

	//     fetch('/users', {
	//       method: 'POST',
	//       body: formData
	//     })
	// }

	//移除图片
	handleRemoveFile(file) {
	    this.setState({
	      ...this.state, form: {
	        ...this.state.form, 
	        files: this.state.form.files.filter(f => f != file)
	      }
	    },()=>{
	    	this.props.getDelete && this.props.getDelete(this.state.form.files);
	    });
	    console.log('handleRemoveFile',this.state.form.files.length);
	}
	//
	onDrop(acceptedFiles, rejectedFiles) {
		console.log('onDrop',acceptedFiles);
		//标志，如果上传图片就为true
		this.isget = true;
		let _this = this;

		// (this.state.form.files.length + acceptedFiles.length <= 8)
		// && this.props.getfiles && this.props.getfiles(acceptedFiles);
		//如果数组的长度超过8的话，就让它等于8
		for(var i in acceptedFiles){
			this.state.form.files.push(acceptedFiles[i]);
		}
		if(this.state.form.files.length > 8){
			this.state.form.files.length = 8;
		}
		
	    delay();
	    //this.props.zoom && this.props.zoom(acceptedFiles, rejectedFiles);
	    function delay(){
	    	setTimeout(dealfileData,1000)
	    }
	    //更新原图片
	    function dealfileData() {
	    	//console.log("dealFiles",acceptedFiles);
	    	_this.setState({
		      form:{
		      	files: _this.state.form.files
		      }
		    });
	    }



	 	
	    //Blob对象转化为dataURL
	 //    function readBlobAsDataURL(blob, callback) {
		//     var a = new FileReader();
		//     a.onload = function(e) {
		//     	callback(e.target.result);
		//     };
		//     //readAsDataURL()读取指定的File和Blob对象
		//     a.readAsDataURL(blob);
		// }
		//遍历得到的图片进行压缩
		let counter = 0;
		let scaleArray = [];
		var arr = this.state.form.files;
		//let thislength = this.state.form.Files.length;
	    arr.forEach(f=>{
    		new ImageCompressor(f, {
			    quality: 0.5,
			    success(result) {
			    	//每次push压缩之后的单个图片
			    	scaleArray.push(result);
			    	console.log("压缩之后的图片",scaleArray);
			    	counter++;
					if( counter === arr.length) {
			    		//console.log('_this.state.form.files',_this.state.form.files.length);
						_this.props.getfiles && _this.props.getfiles(scaleArray);

			    	}
			   //  	readBlobAsDataURL(result,function(data){
			   //  		console.log('data',data);
			   //  		//上面这个函数也是异步
			   //  		//image_base64 = result.split(",")[1];
						// _this.state.form.Files.push(data);
						// console.log('压缩之后的图片',_this.state.form.Files);
						// //在函数里面++，不然还没有压缩完就已经调用函数更新了。
						// counter++;
						// if( counter === acceptedFiles.length) {
				  //   		//console.log('acceptedFiles',acceptedFiles.length);
				  //   		//console.log('_this.state.form.files',_this.state.form.files.length);
				  //   		(_this.state.form.Files.length<= 8) &&
						// 	_this.props.getfiles && _this.props.getfiles(_this.state.form.Files);

						// 	//如果数组的长度超过8的话，就让它等于8
						// 	if(_this.state.form.Files.length > 8){
						// 		_this.state.form.Files.length = 8;
						// 	}

						// 	(_this.state.form.Files.length <= 8) && _this.dealFile();	
				  //   	}
			   //  	})
			    },
			    error(e) {
			      console.log(e.message);
			    },
		  	});
    	})

	    //延时器（为什么要延时）
	    // function delay(){
	    // 	setTimeout(dealFile,1000)
	    // }
	    // //dealFile 得到压缩之后的图片
	   	// function dealFile() {
	    // 	//console.log("dealFiles",acceptedFiles);
	    // 	_this.setState({
		   //    form:{
		   //    	Files: _this.state.form.Files
		   //    }
		   //  });
	    // }
	 //    //console.log('_this.state.form.Files',this.state.form.Files);
	 // //    (this.state.form.Files.length + acceptedFiles.length <= 8) &&
		// // this.props.getfiles && this.props.getfiles(this.state.form.Files);

	 	
	}
	 //延时器（为什么要延时）
    // delay(){
    // 	setTimeout(this.dealFile(),1000)
    // }
    //dealFile 得到压缩之后的图片，需要异步更新
   	// dealFile() {
    // 	//console.log("dealFiles",acceptedFiles);
    // 	this.setState({
	   //    form:{
	   //    	Files: this.state.form.Files
	   //    }
	   //  });
    // }
	//点击上传图片中的每张
	//参数src 是图片的路径
	disImageEvent(src) {
		this.props.getSrc && this.props.getSrc(src);
	}
	render(){
		//console.log('原图片',this.state.form.files);
		return (
			<div className="form_image">
				<form
					className="flex">
					{/*
					<input type="file" value={this.state.form.name}
					name="name"
					onChange={e => this.handleNameChange(e)} multiple/>
					*/}
          			<div className="flex-start center">
          				{this.props.imgName}
          			</div>

          			<Dropzone onDrop={this.onDrop.bind(this)}
          			className="flex-start align-items"
          			style={{width:'100px',height: '30px',color: 'blue'}}>
            			上传图片
          			</Dropzone>
        		</form>
       			<ul className="image_container clearfix">
	            	{
	              		this.state.form.files.map((f,index) => 
		              		<div className="img_box float-left" style={{ width:'85px',height:'85px'}} key={index}>
		              			<img className="images"
		              			height={90} width={90}
		              			src={ f.preview || f.url || f }
		              			onClick={ ()=>this.disImageEvent(f.preview || f.url || f) }/>
			              		<p className="img-close" onClick={this.handleRemoveFile.bind(this, f)}>
			              			<img src={ closeImg } />
			              		</p>
		              		</div>
	              		)
	            	}
	          	</ul>
	          {/*
	          	<div onClick={()=>this.handleSubmit()}>
	          		提交
	          	</div>
	          */}
			</div>
		)
	}
}