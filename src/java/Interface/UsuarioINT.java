package Interface;

import DTO.UsuarioDTO;

public interface UsuarioINT extends OperacionesSQL<UsuarioDTO> {
    public Integer getPermisoUsuario(UsuarioDTO dto);
    
}
