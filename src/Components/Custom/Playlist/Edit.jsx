const Edit = ({form, handleChange, handleSubmit}) => {
  return (
    <div className="px-4 pt-2 pb-4">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Playlist Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              required
              className="border-0 bg-neutral-700 rounded-xl focus:ring-neutral-200 focus:border-neutral-200 focus:border-0 focus:ring-2 placeholder:text-neutral-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description">Playlist Description</label>
            <input
              type="text"
              name="description"
              id="description"
              value={form.description}
              onChange={handleChange}
              required
              className="border-0 bg-neutral-700 rounded-xl focus:ring-neutral-200 focus:border-neutral-200 focus:border-0 focus:ring-2 placeholder:text-neutral-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="public">Playlist Type</label>
            <div className="flex flex-row gap-6">
              <div className="flex flex-row items-center gap-2">
                <input
                  type="radio"
                  name="public"
                  id="public_true"
                  value={true}
                  onChange={handleChange}
                  checked={form.public ? true : false}
                  className="text-green-700 focus:ring-green-700"
                />
                <label htmlFor="description">Public</label>
              </div>
              <div className="flex flex-row items-center gap-2">
                <input
                  type="radio"
                  name="public"
                  id="public_true"
                  value={false}
                  onChange={handleChange}
                  checked={form.public ? false : true}
                  className="text-green-700 focus:ring-green-700"
                />
                <label htmlFor="description">Private</label>
              </div>
            </div>
          </div>
          <button type="submit" className="bg-green-700 py-1 px-4 rounded-lg">
            Create Playlist
          </button>
        </div>
      </form>
    </div>
  )
}

export default Edit