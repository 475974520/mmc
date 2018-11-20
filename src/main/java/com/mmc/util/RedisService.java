package com.mmc.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import redis.clients.jedis.JedisCluster;
import redis.clients.jedis.ShardedJedis;
import redis.clients.jedis.ShardedJedisPool;

@Service
public class RedisService {
	
	@Autowired
	private ShardedJedisPool pool;
	@Autowired
	private JedisCluster jedis;
	
	//set方法无超时
	public void set(String key,String value){
		jedis.set(key, value);
//		ShardedJedis jedis = pool.getResource();
//		jedis.set(key, value);
//		pool.returnResource(jedis);
	}
	//set有超时设置
	public void set(String key,String value,Integer seconds){
		ShardedJedis jedis = pool.getResource();
		jedis.set(key, value);
		jedis.expire(key, seconds);
		pool.returnResource(jedis);
	}
	
	
	//判断key是否存在
	public Boolean exists(String key){
		boolean exists = jedis.exists(key);
//		ShardedJedis jedis = pool.getResource();
//		Boolean exists = jedis.exists(key);
//		pool.returnResource(jedis);
		return exists;
	}
	//get方法
	public String get(String key){
		String value = jedis.get(key);
//		ShardedJedis jedis = pool.getResource();
//		String value = jedis.get(key);
//		pool.returnResource(jedis);
		return value;
	}
	//删除key
	public void del(String key){
		ShardedJedis jedis = pool.getResource();
		jedis.del(key);
		pool.returnResource(jedis);
	}
}
