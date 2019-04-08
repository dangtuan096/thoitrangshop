package com.tuan.Controller;


import java.util.List;

import javax.servlet.http.HttpSession;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.tuan.Entity.DanhMucSanPham;
import com.tuan.Entity.SanPham;
import com.tuan.Service.DanhMucService;
import com.tuan.Service.SanPhamService;


@Controller
@RequestMapping("/")
public class TrangChuController {
	@Autowired
	SanPhamService sanPhamService;
	
	@Autowired
	DanhMucService danhmucService;
		
	
	@GetMapping	
	@Transactional
	// gọi transacstion để thay cho tên định danh từ bean IoC
	// phải khai báo tx: anotation 
	
	public String Default(ModelMap modelMap,HttpSession httpSession) {
		if(httpSession.getAttribute("email") != null) {
			String ten = (String) httpSession.getAttribute("email");
			String FirstChar = ten.toString();
			modelMap.addAttribute("FirstChar",FirstChar);
		}
		List<SanPham> listSanPhams = sanPhamService.layDanhSachSanPhamLimit(-1);
		modelMap.addAttribute("listSanPhams", listSanPhams);
		
		List<DanhMucSanPham> danhMucSanPhams = danhmucService.layDanhMuc();
		modelMap.addAttribute("danhmuc", danhMucSanPhams);
	
		return "TrangChu"; 
	}
	
	
	@GetMapping("/lienhe")
	public String LienHe() {
		
		return "lienhe";
	}
	@GetMapping("/dichvu")
	public String DichVu() {
		
		return "dichvu";
	}
	/*@GetMapping("/giohang")
	public String GioHang() {
		
		return "giohang";
	}*/
	
	@Autowired
	SanPhamService sanphamService;
	@GetMapping("/{id}")
	public String ChiTiet(@RequestParam int id,ModelMap modelMap) {
		SanPham sanPhams =  sanphamService.layDanhSachChiTietSanPhamTheoMa(id);
		modelMap.addAttribute("sanPhams", sanPhams);
		return "chitiet";
	}
}
		


