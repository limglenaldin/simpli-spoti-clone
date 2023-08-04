const UserInfo = ({profile, handleLogOut}) => {
  return (
    <div className="bg-neutral-900 p-4 rounded-xl flex flex-row gap-5 items-center">
      <div className="rounded-full overflow-clip w-16 h-16">
        <img
          src={profile?.images?.length > 1 ? profile?.images[0].url : `https://ui-avatars.com/api/?name=${profile?.display_name}&background=262626&color=15803d` }
          alt={`${profile?.display_name} avatar`}
        />
      </div>
      <div>
        <h1 className="text-2xl font-semibold mb-2">{profile?.display_name}</h1>
        <button onClick={handleLogOut} className="bg-green-700 py-1 px-4 rounded-lg">Logout</button>
      </div>
    </div>
  )
}

export default UserInfo