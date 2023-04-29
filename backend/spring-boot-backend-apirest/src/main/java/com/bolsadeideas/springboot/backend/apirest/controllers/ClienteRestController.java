package com.bolsadeideas.springboot.backend.apirest.controllers;


import java.io.IOException;
import java.net.MalformedURLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bolsadeideas.springboot.backend.apirest.mappers.ClienteMappers;
import com.bolsadeideas.springboot.backend.apirest.models.entity.Cliente;
import com.bolsadeideas.springboot.backend.apirest.models.entity.Region;
import com.bolsadeideas.springboot.backend.apirest.models.services.IClienteService;
import com.bolsadeideas.springboot.backend.apirest.models.services.IUploadFileService;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins= {"http://localhost:4200"})
public class ClienteRestController {

	@Autowired
	private IClienteService clienteService;

	@Autowired
	private ClienteMappers clienteMappers;

	@Autowired
	private IUploadFileService uploadService;
	
	private String clienteCabecera="cliente";
	
	private String errorCabecera="error";
	
	private String mensajeCabecera="mensaje";

	@GetMapping("/clientes")
	public List<Cliente> index(){
		return clienteService.findAll();
	}

	@GetMapping("/clientes/page/{page}")
	public Page<Cliente> index(@PathVariable Integer page){
		Pageable pageable=PageRequest.of(page, 4);
		return clienteService.findAll(pageable);
	}

	@SuppressWarnings("null")
	//@Secured({"ROLE_ADMIN", "ROLE_USER"})
	@GetMapping("/clientes/{id}")
	public ResponseEntity<?> show(@PathVariable Long id) {
		Cliente cliente=null;
		Map<String,Object> response=new HashMap<>();
		try {
			cliente=clienteService.findById(id);
		} catch (DataAccessException e) {
			response.put(mensajeCabecera,"Error al realizar la consulta en la base de datos");
			response.put(errorCabecera,e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		if(cliente==null) {
			response.put(mensajeCabecera,"El cliente ID: ".concat(id.toString().concat(" no existe en la base de datos")));
			return new ResponseEntity<>(response,HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(cliente,HttpStatus.OK);
	}

	@SuppressWarnings("null")
	@Secured("ROLE_ADMIN")
	@PostMapping("/clientes")
	public ResponseEntity<?> create(@Valid @RequestBody Cliente cliente, BindingResult result) {
		Cliente clienteNuevo=null;
		Map<String,Object> response=new HashMap<>();
		if(result.hasErrors()) {
			List<String> errors = result.getFieldErrors()
					.stream()
					.map(err -> "El campo " + err.getField() + ": " + err.getDefaultMessage())
					.toList();
			response.put("errors", errors);
			return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
		}
		try {
			clienteNuevo=clienteService.save(cliente);
		} catch (DataAccessException e) {
			response.put(mensajeCabecera,"Error al realizar el insert en la base de datos");
			response.put(errorCabecera,e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put(mensajeCabecera, "El cliente ha sido creado con éxito");
		response.put(clienteCabecera, clienteNuevo);
		return new ResponseEntity<>(response,HttpStatus.CREATED);
	}

	@SuppressWarnings("null")
	@Secured("ROLE_ADMIN")
	@PutMapping("/clientes/{id}")
	public ResponseEntity<?> update(@Valid @RequestBody Cliente cliente, BindingResult result, @PathVariable Long id) {
		Map<String,Object> response=new HashMap<>();
		Cliente clienteActual=clienteService.findById(id);
		if(result.hasErrors()) {
			List<String> errors = result.getFieldErrors()
					.stream()
					.map(err -> "El campo " + err.getField() + ": " + err.getDefaultMessage())
					.toList();
			response.put("errors", errors);
			return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
		}

		if(clienteActual==null) {
			response.put(mensajeCabecera,"Error: No se pudo editar,el cliente ID: ".concat(id.toString().concat(" no existe en la base de datos")));
			return new ResponseEntity<>(response,HttpStatus.NOT_FOUND);
		}
		Cliente clienteActualizado=clienteMappers.updateCliente(cliente, clienteActual);

		try {
			clienteActualizado=clienteService.save(clienteActualizado);
		} catch (DataAccessException e) {
			response.put(mensajeCabecera,"Error al actualizar en la base de datos");
			response.put(errorCabecera,e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put(mensajeCabecera, "El cliente ha sido actualizado con éxito");
		response.put(clienteCabecera, clienteActualizado);
		return new ResponseEntity<>(response,HttpStatus.CREATED);
	}

	@SuppressWarnings("null")
	@Secured("ROLE_ADMIN")
	@DeleteMapping("/clientes/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		Map<String,Object> response=new HashMap<>();
		try {
			Cliente cliente=clienteService.findById(id);
			String nombreFotoAnterior=cliente.getFoto();
			uploadService.eliminar(nombreFotoAnterior);
			clienteService.delete(id);
		} catch (DataAccessException e) {
			response.put(mensajeCabecera,"No se puede eliminar el cliente ID: ".concat(id.toString()));
			response.put(errorCabecera,e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put(mensajeCabecera, "El cliente con el ID: ".concat(id.toString()).concat(" ha sido eliminado con éxito"));
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@Secured({"ROLE_ADMIN","ROLE_USER"})
	@PostMapping("/clientes/upload")
	public ResponseEntity<?> upload(@RequestParam("archivo") MultipartFile archivo,@RequestParam("id") Long id) {
		Map<String,Object> response=new HashMap<>();
		Cliente cliente=clienteService.findById(id);
		if(!archivo.isEmpty()) {
			String nombreArchivo=null;
			try {
				nombreArchivo=uploadService.copiar(archivo);
			} catch (IOException e) {
				response.put(mensajeCabecera, "Error al subir la imagen del cliente");
				response.put(errorCabecera,e.getMessage().concat(": ").concat(e.getCause().getMessage()));
				return new ResponseEntity<>(response,HttpStatus.INTERNAL_SERVER_ERROR);
			}
			String nombreFotoAnterior=cliente.getFoto();
			uploadService.eliminar(nombreFotoAnterior);

			cliente.setFoto(nombreArchivo);
			clienteService.save(cliente);
			response.put(clienteCabecera, cliente);
			response.put(mensajeCabecera, "Has subido correctamente la imagen: " + nombreArchivo);
		}
		return new ResponseEntity<>(response,HttpStatus.CREATED);
	}

	
	@SuppressWarnings("null")
	@GetMapping("/uploads/img/{nombreFoto:.+}")
	public ResponseEntity<Resource> verFoto(@PathVariable String nombreFoto) {
		Resource recurso=null;
		try {
			recurso=uploadService.cargar(nombreFoto);
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}

		HttpHeaders cabecera=new HttpHeaders();
		cabecera.add(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=\"" + recurso.getFilename() + "\"");
		return new ResponseEntity<>(recurso,cabecera,HttpStatus.OK);
	}
	
	@Secured("ROLE_ADMIN")
	@GetMapping("/clientes/regiones")
	public List<Region> listarRegiones(){
		return clienteService.findAllRegiones();
	}
}
