package com.bolsadeideas.springboot.backend.apirest.models.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.bolsadeideas.springboot.backend.apirest.models.entity.Usuario;

public interface IUsuarioDao extends CrudRepository<Usuario,Long>{
	
	public Usuario findByUsername(String username);
	
	@Query("SELECT u FROM Usuario u WHERE u.username=?1")
	public Usuario findByUsername2(String username);

}
