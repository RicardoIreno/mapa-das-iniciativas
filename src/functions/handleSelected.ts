export function handleSelect(
  e: any,
  // infoEntity: HTMLElement, 
  // infoIniciative: HTMLElement, 
  // infoDesc: HTMLElement, 
  // infoSite: HTMLElement, 
  // infoContact: HTMLElement
) {
  const infoEntity = document.getElementById('info-entity');
  const infoIniciative = document.getElementById('info-iniciative');
  const infoDesc = document.getElementById('info-desc');
  const infoSite = document.getElementById('info-site');
  const infoContact = document.getElementById('info-contact');
  const selectedFeatures = e.selected;
  
  if (selectedFeatures.length > 0) {
    const feature = selectedFeatures[0];
    const properties = feature.getProperties();
    infoEntity.innerHTML = properties.entity;
    infoIniciative.innerHTML = properties.iniciative;
    infoDesc.innerHTML = properties.desc;
    infoSite.innerHTML = properties.site;
    infoContact.innerHTML = properties.contact;
    
    if (infoSite instanceof HTMLAnchorElement && infoSite.href === "") {
      infoSite.href = properties.site;
    }
    if (infoContact instanceof HTMLAnchorElement && infoContact.href === "") {
      infoContact.href = properties.contact;
    }
    
  } else {
    infoEntity.innerHTML = "";
    infoIniciative.innerHTML = "";
    infoDesc.innerHTML = "";
    infoSite.innerHTML = "";
    infoContact.innerHTML = "";
    if (infoSite instanceof HTMLAnchorElement) infoSite.href = "";
    if (infoContact instanceof HTMLAnchorElement) infoContact.href = "";
  }
}