package com.mmc.pojo;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name="car")
public class Car {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;// 主键
	private String brand;// 品牌
	private String model;// 型号
	private String displacement;// 排量
	private String type;// 自动，手动
	private Integer year;// 生产年份
	private Long mileage;// 里程
	private Long price;// 价格
	private Long originalPrice;// 原价
	private Boolean damage;// 是否损坏
	private String image;// 图片
	private String city;// 城市

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	

	public Long getPrice() {
		return price;
	}

	public void setPrice(Long price) {
		this.price = price;
	}

	public Long getOriginalPrice() {
		return originalPrice;
	}

	public void setOriginalPrice(Long originalPrice) {
		this.originalPrice = originalPrice;
	}

	public Long getMileage() {
		return mileage;
	}

	public void setMileage(Long mileage) {
		this.mileage = mileage;
	}

	public Boolean getDamage() {
		return damage;
	}

	public void setDamage(Boolean damage) {
		this.damage = damage;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public String getDisplacement() {
		return displacement;
	}

	public void setDisplacement(String displacement) {
		this.displacement = displacement;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Override
	public String toString() {
		return "Car [id=" + id + ", brand=" + brand + ", model=" + model + ", displacement=" + displacement + ", type="
				+ type + ", year=" + year + ", mileage=" + mileage + ", price=" + price + ", originalPrice="
				+ originalPrice + ", damage=" + damage + ", image=" + image + ", city=" + city + "]";
	}
}
