export class SurveyLocation {
  constructor({
    id = ``,
    lat = ``,
    lng = ``,
    distance = ``,
    survey_id = ``,
    created_at = ``,
    updated_at = ``
  } = {}) {
    this.id = id;
    this.lat = lat;
    this.lng = lng;
    this.distance = distance;
    this.survey_id = survey_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this._destroy = false;
  }
}

export function createSurveyLocation(data) {
  return new SurveyLocation(data);
}

export function appendSurveyLocationsToFormData(formData, surveyLocation, idx) {
  formData.append(`survey[survey_locations_attributes][${idx}][lat]`, surveyLocation.lat);
  formData.append(`survey[survey_locations_attributes][${idx}][lng]`, surveyLocation.lng);
  formData.append(`survey[survey_locations_attributes][${idx}][distance]`, surveyLocation.distance);
  formData.append(`survey[survey_locations_attributes][${idx}][_destroy]`, surveyLocation._destroy);
  formData.append(`survey[survey_locations_attributes][${idx}][id]`, surveyLocation.id);
}
