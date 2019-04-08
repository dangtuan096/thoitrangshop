$(document).ready(function(){ //khi base đc load thì ta chạy các hàm đầu tiên
	$("#col1").click(function(){
		$(this).addClass("activeLink")
	});
	$("#col1").click(function(){
		var chuoi = $("#col1").attr("data-text");
		alert(chuoi);	
	});
	
	$("#btndangnhap").click(function(){
		var ten = $("#email").val();
		var password = $("#matkhau").val();
		$.ajax({
			  url:"/thoitrangshop/api/KiemTraDangNhap",
			  type:"GET",
			  data:{
				  email:ten,
				  matkhau:password,
			  },
			  success: function(value) {
				if(value == "true"){
					duongDanHienTai = window.location.href;
					duongDan = duongDanHienTai.replace("dangnhap/","");
					window.location = duongDan;
					$("#ketqua").text("đăng nhập thành công");
				}else{
					$("#ketqua").text("đăng nhập thất bại");
				}
			}
			})
	});
	

	$("body").on("click",".paging-item",function(){
		/*tất cả các class pagin-item thì ta remove class active*/
		$(".paging-item").removeClass("active");
		$(this).addClass("active");
		var sotrang = $(this).text();
		var spbatdau = (sotrang -1)  * 5; /*là số trang limit*/
		$.ajax({
			  url:"/thoitrangshop/api/LaySanPhamLimit",
			  type:"GET",
			  data:{
				  spbatdau:spbatdau
			  },
			  success: function(value) { 
				 /*value đại diện cho html trong Api*/
				var tbodysanpham =  $("#table-sanpham").find("tbody");
				tbodysanpham.empty(); /*xóa hết bảng table cũ*/
				tbodysanpham.append(value);
			  }
	})
	});
	$(".btngiohang").click(function(){
		//var tenmau = $(this).closest("tr").find(".mau").text();
		// id k cần this và closest và find
	    var	machitiet = $(this).attr("data-machitiet");
		var masp  =  $("#tensp").attr("data-masp");
		var tensp =  $("#tensp").text();
		var mamau = $(this).closest("tr").find(".mau").attr("data-mamau");
		var tenmau = $(this).closest("tr").find(".mau").text();
		var masize = $(this).closest("tr").find(".size").attr("data-size");
		var tensize = $(this).closest("tr").find(".size").text();
		var giatien = $("#giatien").attr("data-giatien");
		var soluong = $(this).closest("tr").find(".soluong").attr("data-soluong");
		
	/*	alert(tensp+"-" +masp+"--"+ giatien+"-" +tenmau +"----"+tensize);*/
		$.ajax({
			  url:"/thoitrangshop/api/ThemGioHang",
			  type:"GET",
			  data:{
				 masp:masp,
				 masize:masize,
				 mamau:mamau,
				 tensp:tensp,
				 giatien:giatien,
				 tenmau:tenmau,
				 tensize:tensize,
				 soluong:soluong,
				 machitiet:machitiet
			  },
			  success: function(value) {
				 /* Cách2*/
				  /*$("#giohang").find("div").addClass("circle-giohang");
					 $("#giohang").find("div").html(value);*/
			}/*khi ajax  chạy xong ta lấy lại số lượng giỏ hàng*/
			  /*cách 1*/
			}).done(function() {
				$.ajax({
					  url:"/thoitrangshop/api/LaySoLuongGioHang",
					  type:"GET",
					  data:{
						
					  },
					  success: function(value) {
						 $("#giohang").find("div").addClass("circle-giohang");
						 $("#giohang").find("div").html(value);
					}
			})
		})
	
	});
	/* Xóa giỏ hàng */
	$(".xoa-giohang").click(function(){
		var sefl = $(this);
		var masp  =  $(this).closest("tr").find(".tensp").attr("data-sp");
		var mamau = $(this).closest("tr").find(".mau").attr("data-mamau");
		var masize = $(this).closest("tr").find(".size").attr("data-size");
		$.ajax({
			  url:"/thoitrangshop/api/XoaGioHang",
			  type:"GET",
			  data:{
				 masp:masp,
				 masize:masize,
				 mamau:mamau,
			  },
			  success: function(value) {
				  sefl.closest("tr").remove(); 
				  gantongtiengiohang(true);
			  }
	})
	})
	gantongtiengiohang();
	function gantongtiengiohang(isEventChange) {
		var tongtiensp = 0;
		
		/*set giá tiền */
		$(".giatien").each(function(){
			var giatien = $(this).text();
			/*var soluong = $(this).closest("tr").find(".soluong-giohang").val();*/
			
			
			
			var format = parseFloat(giatien).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1.").toString();
		
			if(!isEventChange){
				$(this).html(format);
			}
			 tongtiensp = tongtiensp + parseFloat(format);
			 var formattongtien = tongtiensp.toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1.").toString();
		
			/* khi chạy xong gắn vào id */
			$("#tongtien").html(formattongtien + "");
		})
	}
	/* soluong với giá tiền */
	$(".soluong-giohang").change(function(){
		var soluong = $(this).val();
		var giatien = $(this).closest("tr").find(".giatien").attr("data-value");
		
		var tongtien = soluong * parseInt(giatien);
		
		
		var format = tongtien.toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1.").toString();
		$(this).closest("tr").find(".giatien").html(format);
		
		gantongtiengiohang(true);
		
		var soluong = $(this).val();
		var masp  =  $(this).closest("tr").find(".tensp").attr("data-sp");
		var mamau = $(this).closest("tr").find(".mau").attr("data-mamau");
		var masize = $(this).closest("tr").find(".size").attr("data-size");
		$.ajax({
			  url:"/thoitrangshop/api/CapNhatGioHang",
			  type:"GET",
			  data:{
				 masp:masp,
				 masize:masize,
				 mamau:mamau,
				 soluong:soluong
			  },
			  success: function(value) {
				
			}
		});
	});
	$("#xoa-sanpham").click(function(){
		$("#table-sanpham input:checked").each(function(){
			var masp= $(this).val();
			var This =$(this);
			$.ajax({
				  url:"/thoitrangshop/api/XoaSanPham",
				  type:"GET",
				  data:{
					 masp:masp	
				  },
				  success: function(value) {
					This.closest("tr").remove();
				}
			});
		})
	});
	$("#checkall").change(function(){
		if(this.checked){
			$("#table-sanpham input").each(function(){
				$(this).attr("checked","checked");
				
			})
		}
	});
	$("#dangnhap").click(function(){
		$(".container-login-form").show();
		$(".container-signup-form").css("display","none");
	});
	$("#dangky").click(function(){
		$(".container-login-form").css("display","none");
		$(".container-signup-form").show();
	});
	$("#sanphamclick").click(function() {
		var hidelink = $("#sanphamclick");
	})
	/*các sự kiện sau không thể dùng click*/
	$("body").on("click","#csdoitra",function(){
		$(".csdoitra").show();
		$(".phigh").css("display","none");
	});
	$("body").on("click","#phigh",function(){
		$(".phigh").show();
		$(".csdoitra").css("display","none");	
	});
	/*end*/
})

