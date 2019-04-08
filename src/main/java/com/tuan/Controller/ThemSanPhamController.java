package com.tuan.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tuan.Entity.SanPham;
import com.tuan.Service.SanPhamService;

@Controller
@RequestMapping("/themsanpham")
public class ThemSanPhamController {
	@Autowired
	SanPhamService sanphamService;
	
	@GetMapping
	public String Default(ModelMap modelMap) {
		List<SanPham> listSanPham = sanphamService.layDanhSachSanPhamLimit(0);
		List<SanPham> allSanPham = sanphamService.layDanhSachSanPhamLimit(-1);

		// số page sản phẩm
		// làm tròn page
		double tongsopage =Math.ceil((double) allSanPham.size() / 5);
		modelMap.addAttribute("allSanPham", allSanPham);
		modelMap.addAttribute("listSanPham", listSanPham);
		modelMap.addAttribute("tongsopage", tongsopage);
		
		//  java Math.floor
		
		return "themsanpham";
	}
}
