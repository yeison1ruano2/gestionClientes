package com.bolsadeideas.springboot.backend.apirest.mappers;

import org.springframework.stereotype.Component;

import com.bolsadeideas.springboot.backend.apirest.models.entity.Cliente;

@Component
public class ClienteMappersImpl implements ClienteMappers{

	@Override
	public Cliente updateCliente(Cliente cliente, Cliente clienteActual) {
		clienteActual.setNombre(cliente.getNombre());
		clienteActual.setApellido(cliente.getApellido());
		clienteActual.setEmail(cliente.getEmail());
		return clienteActual;
	}

}
