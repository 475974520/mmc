package com.mmc.util;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import redis.clients.jedis.JedisPoolConfig;
import redis.clients.jedis.JedisShardInfo;
import redis.clients.jedis.ShardedJedisPool;

@Configuration
public class RedisConfiguration {
	@Value("${spring.redis.nodes:null}")
	private String nodes;
	@Value("${spring.redis.pool.max-idle:1}")
	private Integer maxIdle;  //最大空闲提供连接数
	@Value("${spring.redis.pool.min-idle:0}")
	private Integer minIdle;
	@Value("${spring.redis.pool.max-total:1}")
	private Integer maxTotal; 	//最大连接数
	@Value("${spring.redis.pool.max-wait:1}")
	private Integer maxWait;
	@Value("${spring.redis.timeout:0}")
	private Integer timeout;
	
	//Jedis池配置对象
	public JedisPoolConfig getConfig(){
		JedisPoolConfig config = new JedisPoolConfig();
		//设置配置参数
		config.setMaxIdle(maxIdle);
		config.setMinIdle(minIdle);
		config.setMaxTotal(maxTotal);
		config.setMaxWaitMillis(maxWait);
		return config;
	}
	//创建并返回分片连接池对象，并且对象由spring框架维护
	@Bean
	public ShardedJedisPool getPool(){
		List<JedisShardInfo> infoList = 
				new ArrayList<JedisShardInfo>();
		//处理字符串nodes
		if(!("null".equals(nodes))){
			String[] hostAndPorts = nodes.split(",");
			for (String node : hostAndPorts) {
				String[] hostAndPort = node.split(":");
				//生成一个JedisShardInfo对象
				JedisShardInfo info = new 
						JedisShardInfo(hostAndPort[0],
							Integer.parseInt(hostAndPort[1]), timeout);
				infoList.add(info);
			}
			//利用池配置对象和JedisShardInfo信息生成分片连接池
			ShardedJedisPool pool = new ShardedJedisPool(getConfig(), infoList);
			return pool;
		}
		return null;
	}
	
}
