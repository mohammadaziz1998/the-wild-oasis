import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');
  if (error) {
    console.log(error);
    throw new Error('cabins counld not be loaded');
  }
  return data;
}

//////////////
export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // https://rlyfhswzafdrqfrvykkz.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  //1) create edit cabin

  let query = supabase.from('cabins');

  /////CREATE CABIN
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //////EDIT CABIN
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error('cabins counld not be created');
  }
  //2) uploaad image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.log(storageError);
    throw new Error(
      'Cabin image counld not be uploaded and the cabin was not created'
    );
  }

  return data;
}

///
export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.log(error);
    throw new Error('Cabins counld not be deleted');
  }
  return data;
}
