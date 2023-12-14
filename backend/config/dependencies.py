from typing import Annotated

from fastapi import Depends

from .utils import InterfaseContextManager, ContextManager


ContextManagerDepends = Annotated[InterfaseContextManager, Depends(ContextManager)]
