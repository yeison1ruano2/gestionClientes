package com.bolsadeideas.springboot.backend.apirest.mappers;

import com.bolsadeideas.springboot.backend.apirest.models.entity.Cliente;

public interface ClienteMappers {
	
	public Cliente updateCliente(Cliente cliente, Cliente clienteActual);

}
