export function nodeTable(node:HTMLElement) 
{
    let x : number;
    let y : number;
    function mouseDown(event : MouseEvent)
    {
        x = event.clientX;
        y = event.clientY;

        node.dispatchEvent(
            new CustomEvent("tabledown",{
                detail:{x,y}
            })
        );
        window.addEventListener('mousemove',mouseMove)
        window.addEventListener('mouseup', mouseUp)
    }
    function mouseMove(event : MouseEvent) {
		const dx = event.clientX - x;
		const dy = event.clientY - y;
		x = event.clientX;
		y = event.clientY;

		node.dispatchEvent(
			new CustomEvent('tablemove', {
				detail: { x, y, dx, dy }
			})
		);
	}
    function mouseUp(event :MouseEvent) {
		x = event.clientX;
		y = event.clientY;

		node.dispatchEvent(
			new CustomEvent('tableend', {
				detail: { x, y }
			})
		);

		window.removeEventListener('mousemove',mouseMove);
		window.removeEventListener('mouseup', mouseUp);
	}
    node.addEventListener('mousedown', mouseDown);
    return {
		destroy() {
			node.removeEventListener('mousedown', mouseDown);
		}
	};
}