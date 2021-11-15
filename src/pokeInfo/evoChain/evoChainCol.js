import * as helpers from "./../../helpers.js";
import EvoChainArrow from "./evoChainArrow";
import Link from 'next/link'
import Image from 'next/image'
function EvoChainCol(props) {
	return (
		<div className="evoChainCol">
			{props.stageChain &&
				props.stageChain.map((poke, i) => (
					<div className="d-flex flex-md-row flex-column">
						<div className="d-flex m-auto">
							{poke && (
								<EvoChainArrow
									evoDetails={poke.evoDetails[0]} //TODO: Handle all of the evo details, not just the first.
								/>
							)}
						</div>
						<div key={"sprite" + i} className="evoColImg">
							{poke && (
								<Link href={"/pokemon/" + poke.name}>
                                    <a>
                                        <Image
                                            title={"#" + poke.id + " " + helpers.capitalize(poke.name)}
                                            width={96}
                                            height={96}
                                            layout={'fixed'}
                                            alt={helpers.capitalize(poke.name)}
                                            src={props.isShiny ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/"+poke.id+".png" : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+poke.id+".png"}
                                            className="d-flex"
                                        />
                                    </a>
                                </Link>

							)}
						</div>
					</div>
				))}
		</div>
	);
}
export default EvoChainCol;
