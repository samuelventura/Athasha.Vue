const resizeObserver = new ResizeObserver(entries => {
  for (let entry of entries) {
    if (entry.contentBoxSize) {
      entry.target.$resizeBinding.value();
    }
  }
});

export default {
  bind: function (el, binding) {
    el.$resizeBinding = binding;
    resizeObserver.observe(el);
  },
  unbind: function (el) {
    resizeObserver.unobserve(el);
  },
}
