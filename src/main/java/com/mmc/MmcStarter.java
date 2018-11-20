package com.mmc;


import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
@MapperScan("com.mmc.mapper")
public class MmcStarter {
	public static void main(String[] args) {
		SpringApplication.run(MmcStarter.class, args);
		
		
	}
	

	
	
}
