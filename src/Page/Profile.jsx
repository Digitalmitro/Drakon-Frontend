import VerticalTabs from "../Component/Tab";

const Profile=() =>{

    return(
        <>
        <section >
       <div className="container-fluid profile-banner">
       
       <h3 className="text-center size">MY ACCOUNT</h3>
       </div>
    </section>

    <section>
    
      <VerticalTabs />
    </section>
        </>
    )
}
export default Profile;