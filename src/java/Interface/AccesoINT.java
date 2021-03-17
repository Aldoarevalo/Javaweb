package Interface;

import DTO.AccesoDTO;

public interface AccesoINT {

    public boolean validarUsuario(AccesoDTO dto);

    public String menuSegunPermiso();

}
