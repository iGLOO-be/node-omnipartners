
import Api from '../../lib/Api'
import { doc, filterInput } from '../../lib/apiDecorators'

export default class ManagePets extends Api {
  @doc('http://doc.omnipartners.be/index.php/Retrieve_pet_information')
  @filterInput(['user_guid'])
  getPets (data) {
    return this.get('/service/pets/get', data, {
      hashNoKey: true,
      retry: true,
      errorMap: {
        2: { message: 'Invalid request in which required header or parameters are either missing or invalid.' },
        3: { message: 'User not found in the system.' },
        8: { message: 'Internal error.' },
        16: { message: 'Invalid hash.' }
      }
    })
  }

  @doc('http://doc.omnipartners.be/index.php/Add_new_pet')
  @filterInput([
    'user_guid',               // (Required) The GUID of the owner of the pet.
    'pet_name',                // (Required) The name of the pet.
    'pet_type',                // (Required) The type of pet. Please refer Animal types list for valid values.
    'pet_breed',               // (Required if pet_breed_com_id not supplied) The id of the pet breed. Please refer Animal breeds list for valid values.
    'pet_breed_com_id',        // (Required if pet_breed not supplied) The common id of the pet breed. Please refer Animal breeds list for valid values. If both pet_breed and pet_breed_com_id are supplied pet_breed_com_id has the priority.
    'pet_pedigreename',        // (Optional) The pedigree name of the pet.
    'pet_dob',                 // (Required) The birthday of the pet in the format YYYY-MM-DD.
    'pet_dob_approx',          // (Optional) States whether pet date of birth is approximative. Valid values are 0 (no correction), 1 (day is not provided by user) and 2 (day and month are not provided by user). Default value is 0.
    'pet_neutered',            // (Optional) This state whether pet is neutered or not. Valid values are “Y” and “N”.
    'pet_neutering_date',      // (Optional) The date which the pet was neutered in the format YYYY-MM-DD.
    'pet_gender',              // (Optional) The gender of the pet. Valid values are “M” and “F”.
    'vaccination_date',        // (Optional) The date of vaccination in the format YYYY-MM-DD.
    'pet_insured',             // (Optional) This state whether pet is insured or not. Valid values are “Y” and “N”.
    'pet_medical_condition',   // (Optional) The medical conditions for the pet.Multiple values could be specified by mimicking the submission behavior of check boxes in an html form. Please refer Animal medical conditions list for valid values.
    'pet_lifestyle',           // (Optional) The lifestyle of the pet. Please refer Animal lifestyles list for valid values.
    'pet_brand',               // (Optional) The brand products given to the pet. Please refer Brands list for valid values.
    'pet_declarative_product', // (Optional) The products given to the pet. Please refer Product collections list for valid values.
    'tattoo_number',           // (Optional) The tattoo number of the pet.
    'chip_number',             // (Optional) The chip number of the pet.
    'kc_number',               // (Optional) The Kennel Club identifier.
    'pet_picture',             // (Optional) The picture should be uploaded using POST request.
    'kc_number',               // (Optional) The Kennel Club identifier.
    'pet_ext_id'               // (Optional) The external id of the pet. This should be a unique value.
  ])
  createPet (data) {
    return this.get('/service/pets/add', data, {
      hashKeys: ['user_guid', 'pet_name'],
      errorMap: {
        2: { message: 'Invalid request in which required header or parameters are either missing or invalid.' },
        3: { message: 'User not found in the system.' },
        6: { message: 'Not authorised to use this function or its disabled.' },
        8: { message: 'Internal error.' },
        16: { message: 'Invalid hash.' },
        35: { message: 'Pet limit reached for this account.' }
      }
    })
  }
}
