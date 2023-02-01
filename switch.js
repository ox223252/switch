"use strict";
class Switch {
	constructor ( config = {} )
	{
		this.config = config;
		if ( undefined == this.targets )
		{
			this.targets = [];
		}

		// get all object from ID
		if ( undefined != this.config.ids )
		{
			for ( let id of this.config.ids )
			{
				this.targets.push ( document.getElementById ( id ) );
			}
		}

		// get all obj from class
		if ( undefined != this.config.class )
		{
			let els = document.getElementsByClassName ( this.config.class );
			this.targets = this.targets.concat ( ...els );
		}

		this.checked = this.config.checked || false;

		// verify that object is only once in array
		this.targets = this.targets.filter(i => this.targets.filter(j => i === j).length === 1);

		this.inputs = [];

		for ( let t of this.targets )
		{
			let label = document.createElement ( "label" );
			label.className = "switch";

			let input = document.createElement ( "input" );
			input.type = "checkbox";
			input.checked = this.checked;
			input.onchange = (e)=>{this.updateStatus ( event.target.checked );};
			
			let span = document.createElement ( "span" );
			span.className = "slider round"
			
			this.inputs.push ( input );

			label.appendChild ( input );
			label.appendChild ( span );
			t.appendChild ( label );
		}
	}

	updateStatus ( flag )
	{
		this.checked = flag;
		for ( let i of this.inputs )
		{
			i.checked = flag;
		}

		this.config.callback(event.target.checked);
	}
}

class DarkLight extends Switch {
	constructor ( config )
	{
		super ( config );
		this.style = {};
		this.setStyle ( );
	}

	setStyle ( style )
	{
		if ( undefined == this.style.div )
		{
			this.style.div = document.createElement('style');
		}

		document.head.appendChild( this.style.div );

		if ( undefined != style )
		{
			this.config.style = style;
		}

		if ( undefined != this.config.style )
		{
			this.style.div.innerHTML = ((this.checked)?this.config.style[1]:this.config.style[0]) || "";
		}
	}

	updateStatus ( flag )
	{
		this.checked = flag;
		for ( let i of this.inputs )
		{
			i.checked = flag;
		}

		console.log ( this.config )

		if ( undefined != this.config.style )
		{
			this.style.div.innerHTML = ((this.checked)?this.config.style[1]:this.config.style[0]) || "";
		}

		this.config.callback(event.target.checked);
	}
}
