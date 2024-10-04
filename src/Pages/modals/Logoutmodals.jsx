export  const LogoutModal = ({handelLogout, closeLogoutModal, showLogoutModal}) => {

    return(
<>
{showLogoutModal && (
    <div className="modal show mt-5" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', marginTop:'3rem' }}>
      <div className="modal-dialog mt-5 pt-5">
        <div className="modal-content mt-5">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Logout</h5>
            <button type="button" className="btn-close" onClick={closeLogoutModal}></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to logout?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeLogoutModal}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handelLogout} style={{backgroundColor:"#FFC824", color:"black", border:"none"}}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  )}
</>
    )
} 