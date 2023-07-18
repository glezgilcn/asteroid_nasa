export function AsteroidInfo({position, diameter, isHazardous, isSentry, name}){
    const numberFormatter = new Intl.NumberFormat('en-US', {unit: 'kilometer',});
    
    const distance = Number(position.miss_distance.kilometers);
    const distanceFormated = numberFormatter.format(distance)
    const maxDiameter = numberFormatter.format(diameter.estimated_diameter_max);
    //const minDiameter = numberFormatter.format(diameter.estimated_diameter_min);

    const isPossibleImpact = isSentry ? 'Yes' : 'No';
    const isHazardousVar = isHazardous ? 'Yes' : 'No';

    return (
        <div className='asteroid-info-container'>
            <p>Position: {distanceFormated} km</p>
            <p>Maximum Diameter: {maxDiameter} km</p>
            <p>Possible Impact: {isPossibleImpact}</p>
            <p>Hazardous: {isHazardousVar}</p>
        </div>
    )
}