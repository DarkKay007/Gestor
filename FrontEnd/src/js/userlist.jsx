const UserListTable = ({ userList }) => {
    if (!Array.isArray(userList)) {
      return <p>Error: Lista de usuarios no válida</p>;
    }
  
    return (
      <table className='userList-table'>
        <thead>
          <tr className='userList-tr'>
            <th className='userList-id-th'>ID</th>
            <th className='userList-name-th'>Usuario</th>
            <th className='userList-email-th'>Email</th>
            <th className='userList-rol-th'>Rol</th>
            <th className='userList-date-th'>Fecha de Creación</th>
          </tr>
        </thead>
        <tbody>
          {userList.map(user => (
            <tr key={user.id}>
              <td className='userList-data-td'>{user.id}</td>
              <td className='userList-data-td'>{user.user}</td>
              <td className='userList-data-td'>{user.email}</td>
              <td className='userList-data-td'>{user.rol}</td>
              <td className='userList-data-td'>{new Date(user.date_create).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

export default UserListTable;